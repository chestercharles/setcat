import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { initUserRepo } from './user-repo/user-repo';

/**
 * Returns an aggregation of repositories that can be injected into the app
 */
export const initRepos = async () => {
  const connection = await createConnection();
  initUserRepo(connection);
  return connection;
};

export type Repo = ThenArg<ReturnType<typeof initRepos>>;
