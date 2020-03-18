import buildRouteTree from 'build-route-tree';

const routes = buildRouteTree({
  auth: {
    login: null,
    'restore-password': null,
    registration: null,
  },
});


export { routes };
