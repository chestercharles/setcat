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

  it('responds with created user when passed valid parameters', function(done) {
    const username = 'Porky';
    const email = 'porkchop@sandwhich.com';

    supertest(server.listener)
      .post('/user')
      .send({
        username,
        email,
        password: 'Synapse1',
      })
      .expect(200, (err, resp) => {
        expect(resp.body.username).toBe(username);
        expect(resp.body.email).toBe(email);
        expect(typeof resp.body.uuid).toBe('string');
        done();
      });
  });

  it('responds with 500: "username is taken" when passed a username that already exists', async function() {
    const username = 'Porky';
    const email = 'porkchop@sandwhich.com';

    await repo.userRepo.save({
      uuid: '123456',
      username,
      email: 'email',
      password: 'password',
    });

    await new Promise(resolve => {
      supertest(server.listener)
        .post('/user')
        .send({
          username,
          email,
          password: 'Synapse1',
        })
        .expect(409, (err, resp) => {
          expect(resp.body.message).toBe('username is taken');
          resolve();
        });
    });
  });
});
