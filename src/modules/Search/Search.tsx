import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { IModule } from 'shared/types/app';
import { routes } from 'modules/routes';
import { NotFound, withAuth } from 'modules/shared';

import { UsersSearchLayout, RepositoriesSearchLayout } from './view/components';

const Search: IModule = {
  getRoutes() {
    return (
      <Route key={routes.search.getElementKey()} path={routes.search.getRoutePath()}>
        <Switch>
          <Route
            exact
            key={routes.search.users.getElementKey()}
            path={routes.search.users.getRoutePath()}
            component={withAuth(UsersSearchLayout)}
          />
          <Route
            exact
            key={routes.search.repositories.getElementKey()}
            path={routes.search.repositories.getRoutePath()}
            component={withAuth(RepositoriesSearchLayout)}
          />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Route>
    );
  },
};

export { Search };
