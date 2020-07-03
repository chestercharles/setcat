import { Connection } from 'typeorm';
import { Plugin } from '@hapi/hapi';

export const initApp = (db: Connection): Plugin<{}> => {
  return {
    name: 'App',
    version: '0.0.1',
    register: async (server, options) => {
      server.route({
        method: 'GET',
        path: '/howdy',
        handler: (request, h) => {
          console.log('Handling');
          return 'Howdy, World!';
        },
      });
    },
  };
};
