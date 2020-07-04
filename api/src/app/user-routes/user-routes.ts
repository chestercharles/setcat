import { Repo } from '../../infra/repo';
import { initPostUserRoute } from './post-user';
import { initGetUser } from './get-user';

export const initUserRoutes = (repo: Repo) => {
  return [initPostUserRoute(repo), initGetUser(repo)];
};
