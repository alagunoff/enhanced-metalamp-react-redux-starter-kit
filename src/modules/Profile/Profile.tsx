import React from 'react';
import { Route } from 'react-router-dom';

import { withRedirect } from 'modules/shared';
import { IModule } from 'shared/types/app';
import { routes } from 'modules/routes';

import { ProfileLayout } from './view/components';

const Profile: IModule = {
  getRoutes() {
    return (
      <Route
        exact
        key={routes.profile.getElementKey()}
        path={routes.profile.getRoutePath()}
        component={withRedirect({ Component: ProfileLayout, withAuth: true })}
      />
    );
  },
};

export { Profile };
