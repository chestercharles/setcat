import * as R from 'fp-ts/lib/Reader';
import { TaskEither } from 'fp-ts/lib/TaskEither';
import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/function';
import { User } from '../../../infra/user-repo/user.model';

type FindUserByUuidResult = {
  username: string;
  email: string;
  uuid: string;
};

type UserFinder = (query: { uuid: string }) => Promise<User[]>;

export const findUserByUuidOrFail = (
  uuid: string,
): R.Reader<UserFinder, TaskEither<Error, FindUserByUuidResult>> => findUser =>
  pipe(
    TE.tryCatch(() => findUser({ uuid }), (e: Error) => e),
    TE.chain(([user]) => {
      if (user) {
        return TE.right({
          username: user.username,
          email: user.email,
          uuid: user.uuid,
        });
      } else {
        return TE.left(new Error('user not found'));
      }
    }),
  );
