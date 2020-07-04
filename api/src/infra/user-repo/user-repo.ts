import { Connection } from 'typeorm';
import { User } from './user.model';

export const initUserRepo = (connection: Connection) => {
  return connection.getRepository(User);
};

export type UserRepo = ReturnType<typeof initUserRepo>;
