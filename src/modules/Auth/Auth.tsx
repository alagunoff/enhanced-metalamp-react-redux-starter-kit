import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from 'modules/routes';
import { NotFound, withRedirect } from 'modules/shared';
import { IModule } from 'shared/types/app';

import { LoginLayout, RegistrationLayout, RestorePasswordLayout } from './view/components';

const Auth: IModule = {
  getRoutes() {
    return (
      <Route key={routes.auth.getElementKey()} path={routes.auth.getRoutePath()}>
        <Switch>
          <Route
            exact
            key={routes.auth.login.getElementKey()}
            path={routes.auth.login.getRoutePath()}
            component={withRedirect({ Component: LoginLayout, withAuth: false })}
          />
          <Route
            exact
            key={routes.auth.registration.getElementKey()}
            path={routes.auth.registration.getRoutePath()}
            component={withRedirect({ Component: RegistrationLayout, withAuth: false })}
          />
          <Route
            exact
            key={routes.auth['restore-password'].getElementKey()}
            path={routes.auth['restore-password'].getRoutePath()}
            component={withRedirect({ Component: RestorePasswordLayout, withAuth: false })}
          />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Route>
    );
  },
};

export { Auth };
