import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import { makeUser } from '../make-user';

describe('makeUser', function() {
  it('makes a user', async () => {
    const username = 'bobbo';
    const email = 'my@email.com';
    const password = '12345';

    const user = await pipe(
      makeUser({
        username,
        email,
        password,
      }),
      TE.getOrElse(error => {
        throw error;
      }),
    )();

    expect(typeof user).toBe('object');
    expect(user.username).toBe(username);
    expect(user.email).toBe(email);
    expect(user.password !== password).toBe(true);
  });
});
