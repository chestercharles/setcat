import { initServer } from './server';
import { initRepo } from './infra/repo';

(async () => {
  console.log(`Running environment ${process.env.NODE_ENV || 'dev'}`);

  process.on('uncaughtException', (error: Error) => {
    console.error(`uncaughtException ${error.message}`);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: any) => {
    console.error(`unhandledRejection ${reason}`);
    process.exit(1);
  });

  const repo = await initRepo();
  const server = await initServer(repo);
  console.log(`Server running on ${server.info.uri}`);
})();
