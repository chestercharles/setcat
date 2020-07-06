import { initRepos } from '../../../infra/initRepos';
import { addUser, findUser } from '../../../infra/user-repo/user-repo';

describe.only('userRepo', function() {
  beforeAll(async () => {
    await initRepos();
  });

  it('addUser is a function', async () => {
    expect(typeof addUser).toBe('function');
  });

  it('findUser is a function', async () => {
    expect(typeof findUser).toBe('function');
  });
});
