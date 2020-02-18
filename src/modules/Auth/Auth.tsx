import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from 'modules/routes';
import { IModule } from 'shared/types/app';

//import { LoginLayout, RestorePasswordLayout, RegistrationLayout } from './view/components';
import { LoginLayout } from './view/components';

const Auth: IModule = {
  getRoutes() {
    return (
      <Route
        key={routes.auth.getElementKey()}
        path={routes.auth.getRoutePath()}
      >
        <Switch>
          <Route
            key={routes.auth.login.getElementKey()}
            path={routes.auth.login.getRoutePath()}
            component={LoginLayout}
          />
          {/* <Route
            key={routes.auth.restorePassword.getElementKey()}
            path={routes.auth.restorePassword.getRoutePath()}
            component={RestorePasswordLayout}
          />
          <Route
            key={routes.auth.registration.getElementKey()}
            path={routes.auth.registration.getRoutePath()}
            component={RegistrationLayout}
          /> */}
        </Switch>
      </Route>
    );
  },
};

export { Auth };
