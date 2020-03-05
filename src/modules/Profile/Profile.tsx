import React from 'react';
import { Route } from 'react-router-dom';

import { withAuth } from 'modules/shared';
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
        component={withAuth(ProfileLayout)}
      />
    );
  },
};

export { Profile };
