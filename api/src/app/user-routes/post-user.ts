import { ServerRoute, RequestWithPayload } from '@hapi/hapi';
import { Repo } from '../../infra/repo';
import { initCreateUser } from '../../domain/user/create-user';
import { conflict, internal } from '@hapi/boom';

export const initPostUserRoute = (repo: Repo): ServerRoute => {
  const createUser = initCreateUser(repo.userRepo);
  return {
    method: 'POST',
    path: '/user',
    handler: async (
      request: RequestWithPayload<PostUserReqDTO>,
      h,
    ): Promise<PostUserResDTO> => {
      const { username, password, email } = request.payload;
      try {
        const user = await createUser({ username, password, email });
        return user;
      } catch (e) {
        if (e.message === 'username is taken') {
          throw conflict(e.message);
        } else {
          throw internal(e);
        }
      }
    },
  };
};
