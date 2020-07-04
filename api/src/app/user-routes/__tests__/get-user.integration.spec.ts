import * as supertest from 'supertest';
import { ApiServer, initServer } from '../../../server';
import { initRepo, Repo } from '../../../infra/repo';

describe('GET user', function() {
  let server: ApiServer;
  let repo: Repo;

  beforeAll(async () => {
    repo = await initRepo();
    server = await initServer(repo);
  });

  beforeEach(async () => {
    await repo.userRepo.query('TRUNCATE TABLE "user";');
  });

  afterAll(async () => {
    await server.stop();
  });

  it('responds user if passed uuid of existing user', async () => {
    const uuid = '123456';
    const username = 'Porky';
    const email = 'porkchop@sandwhich.com';

    await repo.userRepo.save({
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

  it('does not return user password', async () => {
    const uuid = '123456';
    const username = 'Porky';
    const email = 'porkchop@sandwhich.com';

    await repo.userRepo.save({
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
});
