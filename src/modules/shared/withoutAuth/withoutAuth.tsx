import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { IAppReduxState } from 'shared/types/app';
import { routes } from 'modules/routes';
import { namespace as UserNamespace } from 'services/user';

type IStateProps = {
  user: UserNamespace.IUser | null;
};

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    user: state.user.data.user,
  };
}

type IProps = IStateProps & RouteComponentProps;

function withoutAuth(Component: React.ComponentType) {
  class WithoutAuth extends React.Component<IProps> {
    public componentDidMount() {
      const { user, history } = this.props;

      if (user !== null) {
        history.push(routes.search.repositories.getRedirectPath());
      }
    }

    public render() {
      return <Component {...this.props} />;
    }
  }

  return withRouter(connect(mapStateToProps)(WithoutAuth));
}

export { withoutAuth };
