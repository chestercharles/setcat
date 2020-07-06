import { initServer } from './server';
import { initRepos } from './infra/initRepos';

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

  await initRepos();
  const server = await initServer();
  console.log(`Server running on ${server.info.uri}`);
})();
