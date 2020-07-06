import { CreateUserArg } from './create-user';
import * as R from 'fp-ts/lib/Reader';
import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import { User } from '../../../infra/user-repo/user.model';
import { sequenceT } from 'fp-ts/lib/Apply';

type ValidationQuery = { username?: string; email?: string };

type UserFinder = (query: ValidationQuery) => Promise<User[]>;

export const validateParams = (
  params: CreateUserArg,
): R.Reader<UserFinder, TE.TaskEither<Error, CreateUserArg>> => findUser => {
  const userFinder = makeUserFinder(findUser);
  const usersWithEmail = userFinder({ email: params.email });
  const usersWithUsername = userFinder({ username: params.username });

  const validateUsername = pipe(
    usersWithUsername,
    TE.chain(ensureNoUsersExist('username is taken')),
  );

  const validateEmail = pipe(
    usersWithEmail,
    TE.chain(ensureNoUsersExist('email is registered')),
  );

  return TE.taskEither.map(
    sequenceT(TE.taskEither)(validateEmail, validateUsername),
    () => params,
  );
};

const makeUserFinder = (findUser: UserFinder) => (query: ValidationQuery) =>
  TE.tryCatch(() => findUser(query), (e: Error) => e);

const ensureNoUsersExist = (message: string) => (
  users: User[],
): TE.TaskEither<Error, boolean> =>
  pipe(
    users,
    u => u.length > 0,
    usersExists => {
      if (usersExists) {
        return TE.left(new Error(message));
      }
      return TE.right(true);
    },
  );
