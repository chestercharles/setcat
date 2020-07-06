import { ServerRoute, RequestWithPayload } from '@hapi/hapi';
import { object, string } from '@hapi/joi';
import { createUser } from '../../domain/user/create-user/create-user';
import { conflict, internal } from '@hapi/boom';
import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/function';

const payloadValidationSchema = object({
  username: string()
    .min(3)
    .max(50)
    .required(),
  email: string()
    .email()
    .required(),
  password: string()
    .min(7)
    .max(20)
    .required(),
});

export const postUserRoute: ServerRoute = {
  method: 'POST',
  path: '/user',
  handler: async (
    request: RequestWithPayload<PostUserReqDTO>,
    h,
  ): Promise<PostUserResDTO> => {
    const createdUser = await pipe(
      createUser(request.payload),
      TE.mapLeft(handleException),
      TE.getOrElse(u => u),
    )();
    return createdUser;
  },
  options: {
    validate: {
      payload: payloadValidationSchema,
    },
  },
};

const handleException = (e: Error) => {
  if (
    e.message === 'username is taken' ||
    e.message === 'email is registered'
  ) {
    throw conflict(e.message);
  } else {
    throw internal(e.message);
  }
};
