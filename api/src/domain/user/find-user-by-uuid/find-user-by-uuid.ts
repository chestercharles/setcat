import { TaskEither } from 'fp-ts/lib/TaskEither';
import { findUserByUuidOrFail } from './find-user-by-uuid-or-fail';
import { findUser } from '../../../infra/user-repo/user-repo';

type FindUserByUuidResult = {
  username: string;
  email: string;
  uuid: string;
};

export const findUserByUuid = (
  uuid: string,
): TaskEither<Error, FindUserByUuidResult> =>
  findUserByUuidOrFail(uuid)(findUser);
