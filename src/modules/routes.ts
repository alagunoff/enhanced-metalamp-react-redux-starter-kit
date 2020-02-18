import { routes as searchRoutes } from './Search/routes';
import { routes as profileRoutes } from './Profile/routes';
import { routes as authRoutes } from './Auth/routes';

export const routes = {
  ...searchRoutes,
  ...profileRoutes,
  ...authRoutes,
};
