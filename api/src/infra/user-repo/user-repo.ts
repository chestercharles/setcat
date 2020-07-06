import { Connection, Repository } from 'typeorm';
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

export const findUser = repository.find;

export type UserRepo = ReturnType<typeof initUserRepo>;
