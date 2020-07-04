import { Connection } from 'typeorm';
import { Plugin } from '@hapi/hapi';
import { Repo } from '../infra/repo';
import { initUserRoutes } from './user-routes/user-routes';

export const initApp = (repo: Repo): Plugin<{}> => {
  return {
    name: 'App',
    version: '0.0.1',
    register: async (server, options) => {
      const userRoutes = initUserRoutes(repo);
      server.route(userRoutes);
    },
  };
};
