import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { IAppReduxState } from 'shared/types/app';
import { routes } from 'modules/routes';
import { namespace as UserNamespace } from 'services/user';

interface IOwnProps {
  Component: React.ComponentType;
  withAuth: boolean;
}

interface IStateProps {
  user: UserNamespace.IUser | null;
}

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    user: state.user.data.user,
  };
}

type Props = IStateProps & RouteComponentProps;

function withRedirect({ Component, withAuth }: IOwnProps) {
  class WithRedirect extends React.Component<Props> {
    public componentDidMount() {
      const { user, history } = this.props;

      if (user === null && withAuth) {
        history.push(routes.auth.registration.getRedirectPath());
      }

      if (user !== null && !withAuth) {
        history.push(routes.search.repositories.getRedirectPath());
      }
    }

    public render() {
      return <Component {...this.props} />;
    }
  }

  return withRouter(connect(mapStateToProps)(WithRedirect));
}

export { withRedirect };
