import buildRouteTree from 'build-route-tree';

export const routes = buildRouteTree({
  auth: {
    login: null,
    'restore-password': null,
    registration: null,
  },
});
