import React from 'react';
import { Route } from 'react-router-dom';

import { withAuth } from 'shared/helpers/react/withAuth';
import { routes } from 'modules/routes';
import { IModule } from 'shared/types/app';

import { ProfileLayout } from './view/components';

const Profile: IModule = {
  getRoutes() {
    return (
      <Route
        key={routes.profile.getElementKey()}
        path={routes.profile.getRoutePath()}
        component={withAuth(ProfileLayout)}
      />
    );
  },
};

export { Profile };
