import { Connection } from 'typeorm';
import { Plugin } from '@hapi/hapi';
import { Repo } from '../infra/initRepos';
import { userRoutes } from './user-routes/user-routes';

export const app: Plugin<{}> = {
  name: 'App',
  version: '0.0.1',
  register: async (server, options) => {
    server.route(userRoutes);
  },
};
