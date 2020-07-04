import * as supertest from 'supertest';
import { ApiServer, initServer } from '../../../server';
import { initRepo, Repo } from '../../../infra/repo';

describe('POST user', function() {
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

  it('responds with created user when passed valid parameters', async () => {
    const username = 'Porky';
    const email = 'porkchop@sandwhich.com';

    return supertest(server.listener)
      .post('/user')
      .send({
        username,
        email,
        password: 'Synapse1',
      })
      .expect(200)
      .then(async res => {
        expect(res.body.username).toBe(username);
        expect(res.body.email).toBe(email);
        expect(typeof res.body.uuid).toBe('string');
      });
  });

  it('responds with 409: "username is taken" when passed a username that already exists', async () => {
    const username = 'Porky';
    const email = 'porkchop@sandwhich.com';

    await repo.userRepo.save({
      uuid: '123456',
      username,
      email: 'email',
      password: 'password',
    });

    return supertest(server.listener)
      .post('/user')
      .send({
        username,
        email,
        password: 'Synapse1',
      })
      .expect(409)
      .then(async res => {
        expect(res.body.message).toBe('username is taken');
      });
  });

  it('responds with 409: "email is registered" when passed a email that already exists', async () => {
    const username = 'Porky';
    const email = 'porkchop@sandwhich.com';
    const password = 'Synapse1';

    await repo.userRepo.save({
      uuid: '123456',
      username,
      email,
      password,
    });

    return supertest(server.listener)
      .post('/user')
      .send({
        username,
        email,
        password,
      })
      .expect(409)
      .then(async res => {
        expect(res.body.message).toBe('email is registered');
      });
  });

  it('responds with 400 when passed a invalid parameters', async () => {
    const username = '';
    const email = 'invalid';
    const password = 'notgoodenough';

    return supertest(server.listener)
      .post('/user')
      .send({
        username,
        email,
        password,
      })
      .expect(400)
      .then(async res => {
        expect(res.body.message).toBe('Invalid request payload input');
      });
  });
});
