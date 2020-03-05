import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { IAppReduxState } from 'shared/types/app';
import { routes } from 'modules/routes';
import { namespace as UserNamespace, actionCreators as userActions } from 'services/user';

type IStateProps = {
  user: UserNamespace.IUser | null;
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
    public componentDidMount() {
      const { user: reduxUser, updateUser, history } = this.props;
      const user = localStorage.getItem('authUser');

      if (user === null) {
        history.push(routes.auth.registration.getRedirectPath());
      } else {
        if (reduxUser === null) {
          updateUser(JSON.parse(user));
        }
      }
    }

    public render() {
      return <Component {...this.props} />;
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(withRouter(WithAuth));
}

export { withAuth };
