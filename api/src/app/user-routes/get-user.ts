import { ServerRoute, RequestWithQuery } from '@hapi/hapi';
import { object, string } from '@hapi/joi';
import { Repo } from '../../infra/repo';
import { notFound, internal } from '@hapi/boom';
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
        handleError(e);
      }
    },
    options: {
      validate: {
        query: queryValidator,
      },
    },
  };
};

const handleError = (e: Error) => {
  if (e.message === 'user not found') {
    throw notFound(e.message);
  } else {
    throw internal(e.message);
  }
};

const queryValidator = object({
  uuid: string().required(),
});
