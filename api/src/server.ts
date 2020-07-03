import { Server } from '@hapi/hapi';
import { Connection } from 'typeorm';
import { initDatabase } from './infra/initDatabase';
import { initApp } from './app/initApp';

console.log(`Running environment ${process.env.NODE_ENV || 'dev'}`);

process.on('uncaughtException', (error: Error) => {
  console.error(`uncaughtException ${error.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason: any) => {
  console.error(`unhandledRejection ${reason}`);
  process.exit(1);
});

const initServer = async (db: Connection) => {
  const app = initApp(db);
  const server = new Server({
    debug: { request: ['error'] },
    port: '9000',
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  await server.register(app);
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

initDatabase().then(initServer);
