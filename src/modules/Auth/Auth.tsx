import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from 'modules/routes';
import { IModule } from 'shared/types/app';

import { LoginLayout, RegistrationLayout, RestorePasswordLayout } from './view/components';

const Auth: IModule = {
  getRoutes() {
    return (
      <Route key={routes.auth.getElementKey()} path={routes.auth.getRoutePath()}>
        <Switch>
          <Route
            key={routes.auth.login.getElementKey()}
            path={routes.auth.login.getRoutePath()}
            component={LoginLayout}
          />
          <Route
            key={routes.auth.registration.getElementKey()}
            path={routes.auth.registration.getRoutePath()}
            component={RegistrationLayout}
          />
          <Route
            key={routes.auth['restore-password'].getElementKey()}
            path={routes.auth['restore-password'].getRoutePath()}
            component={RestorePasswordLayout}
          />
        </Switch>
      </Route>
    );
  },
};

export { Auth };
