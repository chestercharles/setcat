import { ServerRoute, RequestWithQuery } from '@hapi/hapi';
import { Repo } from '../../infra/repo';
import { badRequest } from '@hapi/boom';
import { initFindUserByUuid } from '../../domain/user/find-user-by-uuid';

export const initGetUser = (repo: Repo): ServerRoute => {
  const findUserByUuid = initFindUserByUuid(repo.userRepo);
  return {
    method: 'GET',
    path: '/user',
    handler: async (
      request: RequestWithQuery<GetUserReqDTO>,
      h,
    ): Promise<GetUserResDTO> => {
      try {
        const user = await findUserByUuid(request.query.uuid);
        return user;
      } catch (e) {
        badRequest(e);
      }
    },
  };
};
