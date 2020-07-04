import { Server } from '@hapi/hapi';
import { initApp } from './app/app';
import { Repo } from './infra/repo';

export const initServer = async (repo: Repo) => {
  const app = initApp(repo);
  const server = new Server({
    debug: false,
    port: process.env.API_PORT,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  await server.register(app);
  await server.start();
  return server;
};

export type ApiServer = ThenArg<ReturnType<typeof initServer>>;
