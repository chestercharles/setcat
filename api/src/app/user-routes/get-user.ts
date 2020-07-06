import { ServerRoute, RequestWithQuery } from '@hapi/hapi';
import { object, string } from '@hapi/joi';
import { notFound, internal } from '@hapi/boom';
import * as TE from 'fp-ts/lib/TaskEither';
import { findUserByUuid } from '../../domain/user/find-user-by-uuid/find-user-by-uuid';
import { pipe } from 'fp-ts/lib/function';

const queryValidator = object({
  uuid: string().required(),
});

export const getUserRoute: ServerRoute = {
  method: 'GET',
  path: '/user',
  handler: async (
    request: RequestWithQuery<GetUserReqDTO>,
    h,
  ): Promise<GetUserResDTO> => {
    const user = await pipe(
      findUserByUuid(request.query.uuid),
      TE.mapLeft(handleError),
      TE.getOrElse(u => u),
    )();
    return user;
  },
  options: {
    validate: {
      query: queryValidator,
    },
  },
};

const handleError = (e: Error) => {
  if (e.message === 'user not found') {
    throw notFound(e.message);
  } else {
    throw internal(e.message);
  }
};
