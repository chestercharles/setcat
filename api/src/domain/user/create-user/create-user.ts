
import * as TE from 'fp-ts/lib/TaskEither';
import { makeUser } from './make-user';
import { addUser, findUser } from '../../../infra/user-repo/user-repo';
import { validateParams } from './validate-params';
import { saveUser } from './save-user';
import { pipe } from 'fp-ts/lib/pipeable';

export type CreateUserArg = {
  username: string;
  email: string;
  password: string;
};

export type CreateUserResult = {
  uuid: string;
  username: string;
  email: string;
  password: string;
};

export const createUser = (params: CreateUserArg) =>
  pipe(
    params,
    validateParams,
    doValidation => doValidation(findUser),
    TE.chain(makeUser),
    TE.chain(validatedParams =>
      pipe(
        validatedParams,
        saveUser,
        doSave => doSave(addUser),
      ),
    ),
  );

