import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { routes } from 'modules/routes';

type IProps =  RouteComponentProps;

function withoutAuth(Component: React.ComponentType) {
  class WithoutAuth extends React.PureComponent<IProps> {
    public componentDidMount() {
      const { history } = this.props;
      const user = localStorage.getItem('authUser');

      if (user !== null) {
        history.push(routes.search.repositories.getRedirectPath());
      }
    }

    public render() {
      return <Component {...this.props} />;
    }
  }

  return withRouter(WithoutAuth);
}

export { withoutAuth };
