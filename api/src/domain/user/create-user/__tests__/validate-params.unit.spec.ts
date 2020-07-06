import { validateParams } from '../validate-params';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';

describe('validateParams', function() {
  it('doesn not return an error when params are valid', async () => {
    const fakeFindUser = async (query: any) => [] as any;

    const username = 'bobbo';
    const email = 'my@email.com';
    const password = '12345';

    const params = await pipe(
      validateParams({
        username,
        email,
        password,
      })(fakeFindUser),
      TE.getOrElse(error => {
        throw error;
      }),
    )();

    expect(typeof params).toBe('object');
    expect(params.username).toBe(username);
    expect(params.email).toBe(email);
    expect(params.password).toBe(password);
  });
  it(' returns an `email is registered` when passed an existing email', async () => {
    const username = 'bobbo';
    const email = 'my@email.com';
    const password = '12345';

    const fakeFindUser = async (query: any) => {
      if (query.email === email) {
        return [{}];
      }
      return [] as any;
    };

    const paramsOrError = await validateParams({
      username,
      email,
      password,
    })(fakeFindUser)();

    expect(E.isLeft(paramsOrError)).toBe(true);
    E.either.mapLeft(paramsOrError, e =>
      expect(e.message).toBe('email is registered'),
    );
  });
});
