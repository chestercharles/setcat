import * as supertest from 'supertest';
import { ApiServer, initServer } from '../../../server';
import { initRepos, Repo } from '../../../infra/initRepos';
import { addUser } from '../../../infra/user-repo/user-repo';

describe('GET user', function() {
  let server: ApiServer;
  let repo: Repo;

  beforeAll(async () => {
    repo = await initRepos();
    server = await initServer();
  });

  beforeEach(async () => {
    await repo.query('TRUNCATE TABLE "user";');
  });

  afterAll(async () => {
    await server.stop();
  });

  it('responds with user if passed uuid of existing user', async () => {
    const uuid = '123456';
    const username = 'Porky';
    const email = 'porkchop@sandwhich.com';

    await addUser({
      uuid,
      username,
      email,
      password: 'password',
    });

    return supertest(server.listener)
      .get('/user?uuid=' + uuid)
      .expect(200)
      .then(async res => {
        expect(res.body.uuid).toBe(uuid);
        expect(res.body.username).toBe(username);
        expect(res.body.email).toBe(email);
      });
  });

  it('does not respond with user password', async () => {
    const uuid = '123456';
    const username = 'Porky';
    const email = 'porkchop@sandwhich.com';

    await addUser({
      uuid,
      username,
      email,
      password: 'password',
    });

    return supertest(server.listener)
      .get('/user?uuid=' + uuid)
      .expect(200)
      .then(async res => {
        expect(typeof res.body.password).toBe('undefined');
      });
  });

  it('responds with 404 if no user exists', async () => {
    const uuid = '123456';

    return supertest(server.listener)
      .get('/user?uuid=' + uuid)
      .expect(404)
      .then(async res => {
        expect(res.body.message).toBe('user not found');
      });
  });

  it('responds with 400 if passed invalid parameters', async () => {
    return supertest(server.listener)
      .get('/user')
      .expect(400)
      .then(async res => {
        expect(res.body.message).toBe('Invalid request query input');
      });
  });
});
