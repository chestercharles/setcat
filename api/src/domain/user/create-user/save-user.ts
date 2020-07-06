import { CreateUserArg, CreateUserResult } from './create-user';
import * as R from 'fp-ts/lib/Reader';
import * as TE from 'fp-ts/lib/TaskEither';

type UserAdder = (user: CreateUserResult) => Promise<any>;

export const saveUser = (
  user: CreateUserResult,
): R.Reader<
  UserAdder,
  TE.TaskEither<Error, CreateUserArg & { uuid: string }>
> => addUser => TE.tryCatch(() => addUser(user), (e: Error) => e);
