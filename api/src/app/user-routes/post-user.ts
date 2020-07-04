import { ServerRoute, RequestWithPayload } from '@hapi/hapi';
import { object, string } from '@hapi/joi';
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
      try {
        const user = await createUser(request.payload);
        return user;
      } catch (e) {
        handleException(e);
      }
    },
    options: {
      validate: {
        payload: payloadValidationSchema,
      },
    },
  };
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
