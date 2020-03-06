import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { IAppReduxState } from 'shared/types/app';
import { routes } from 'modules/routes';
import { namespace as UserNamespace } from 'services/user';

type IStateProps = {
  user: UserNamespace.IUser | null;
};
type IProps = IStateProps & RouteComponentProps;

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    user: state.user.data.user,
  };
}

function withAuth(Component: React.ComponentType) {
  class WithAuth extends React.Component<IProps> {
    public componentDidMount() {
      const { user, history } = this.props;

      if (user === null) {
        history.push(routes.auth.registration.getRedirectPath());
      }
    }

    public render() {
      return <Component {...this.props} />;
    }
  }

  return withRouter(connect(mapStateToProps)(WithAuth));
}

export { withAuth };
