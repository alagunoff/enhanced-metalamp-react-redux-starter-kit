import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { routes } from 'modules/routes';
import { IAppReduxState } from 'shared/types/app';
import { namespace as UserNamespace, actionCreators as userActions } from 'services/user';

type IStateProps = {
  user: UserNamespace.IUser;
};
type IActionProps = typeof mapDispatchToProps;
type IProps = IStateProps & IActionProps & RouteComponentProps;

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    user: state.user.data.user,
  };
}

const mapDispatchToProps = {
  updateUser: userActions.updateUser,
};

function withAuth(Component: React.ComponentType) {
  class WithAuth extends React.PureComponent<IProps> {
    constructor(props: IProps) {
      super(props);

      this.initWithAuth();
    }

    initWithAuth() {
      const { updateUser, history } = this.props;
      const user = localStorage.getItem('authUser');

      if (user === null) {
        history.push(routes.auth.login.getRedirectPath());
      } else {
        updateUser(JSON.parse(user));
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(withRouter(WithAuth));
}

export { withAuth };
