import { CreateUserArg, CreateUserResult } from './create-user';
import { generateUuid } from '../../../lib/generate-uuid';
import { genSalt, hash } from 'bcryptjs';
import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';

export const makeUser = (
  params: CreateUserArg,
): TE.TaskEither<Error, CreateUserResult> =>
  TE.taskEither.map(hashPassword(params.password), hashedPassword => {
    return {
      ...params,
      password: hashedPassword,
      uuid: generateUuid(),
    };
  });

const hashPassword = (password: string): TE.TaskEither<Error, string> =>
  pipe(
    generateSalt,
    TE.chain(performHashing(password)),
  );

const generateSalt = TE.tryCatch(() => genSalt(10), (e: Error) => e);

const performHashing = (password: string) => (salt: string) =>
  TE.tryCatch(() => hash(password, salt), (e: Error) => e);
