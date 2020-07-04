import { initCreateUser } from '../create-user';

describe('createUser', function() {
  it('initCreateUser returns a function', function() {
    const createUser = initCreateUser({} as any);
    expect(typeof createUser).toBe('function');
  });
});
