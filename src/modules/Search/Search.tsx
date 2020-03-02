import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { withAuth } from 'shared/helpers/react/withAuth';
import { routes } from 'modules/routes';
import { IModule } from 'shared/types/app';

import { UsersSearchLayout, RepositoriesSearchLayout } from './view/components';

const Search: IModule = {
  getRoutes() {
    return (
      <Route
        key={routes.search.getElementKey()}
        path={routes.search.getRoutePath()}
      >
        <Switch>
          <Route
            key={routes.search.users.getElementKey()}
            path={routes.search.users.getRoutePath()}
            component={withAuth(UsersSearchLayout)}
          />
          <Route
            key={routes.search.repositories.getElementKey()}
            path={routes.search.repositories.getRoutePath()}
            component={withAuth(RepositoriesSearchLayout)}
          />
        </Switch>
      </Route>
    );
  },
};

export { Search };
