import { Server } from '@hapi/hapi';
import { app } from './app/app';

export const initServer = async () => {
  const server = new Server({
    // debug: { request: ['error']},
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
