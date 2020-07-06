import { Connection, Repository, FindConditions } from 'typeorm';
import { User } from './user.model';

let repository: Repository<User> = {} as any;

export const initUserRepo = (connection: Connection) => {
  repository = connection.getRepository(User);
};

export const addUser = async (user: {
  uuid: string;
  username: string;
  email: string;
  password: string;
}) => {
  return repository.save(user);
};

export const findUser = async (query: FindConditions<User>) => {
  return repository.find(query);
};

export type UserRepo = ReturnType<typeof initUserRepo>;
