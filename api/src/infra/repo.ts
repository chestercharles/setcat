import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { initUserRepo } from './user-repo/user-repo';

/**
 * Returns an aggregation of repositories that can be injected into the app
 */
export const initRepo = async () => {
  const connection = await createConnection();
  const userRepo = initUserRepo(connection);
  return {
    userRepo,
  };
};

const resolveConnectionOptions = () => {
  if (process.env.NODE_ENV === 'test') {
    return {};
  }
  return {
    type: 'postgres',
    host: 'postgres',
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ['dist/**/*.model.js'],
  };
};

export type Repo = ThenArg<ReturnType<typeof initRepo>>;
