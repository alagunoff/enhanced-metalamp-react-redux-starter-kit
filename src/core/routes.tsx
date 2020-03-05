import React from 'react';
import { Route, RouteComponentProps, Switch, Redirect } from 'react-router-dom';

import { IModule } from 'shared/types/app';
import { App } from 'modules/App';
import { NotFound } from 'modules/shared';
import { routes } from 'modules/routes';

function getRoutes(modules: IModule[]): React.ReactElement<RouteComponentProps<any>> {
  return (
    <Route>
      <App>
        <Switch>
          {modules.map(module => (module.getRoutes ? module.getRoutes() : null))}
          <Redirect exact from="/" to={routes.auth.registration.getRoutePath()} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </App>
    </Route>
  );
}

export { getRoutes };
