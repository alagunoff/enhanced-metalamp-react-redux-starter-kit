import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { routes } from 'modules/routes';
import { IAppReduxState } from 'shared/types/app';
import { namespace as UserNamespace } from 'services/user';

type IStateProps = {
  user: UserNamespace.IUser;
};

type IProps = IStateProps & RouteComponentProps;

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    user: state.user.data.user,
  };
}

function withAuth(Component: React.ComponentType) {
  class WithAuth extends React.PureComponent<IProps> {
    componentWillMount() {
      const { user, history } = this.props;

      if (user === null) {
        history.push(routes.auth.login.getRedirectPath());
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return connect(mapStateToProps, null)(withRouter(WithAuth));
}

export { withAuth };
