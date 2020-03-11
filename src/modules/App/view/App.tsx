import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { Preloader } from 'shared/view/elements';
import { namespace as UserNamespace, actionCreators as userActions } from 'services/user';

type IState = {
  isLoadingUser: boolean;
};

type IStateProps = {
  user: UserNamespace.IUser | null;
  loadUserCommunication: ICommunication;
};

type IActionProps = typeof mapDispatchToProps;

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    user: state.user.data.user,
    loadUserCommunication: state.user.communication.loadUser,
  };
}

const mapDispatchToProps = {
  loadUser: userActions.loadUser,
};

type IProps = IStateProps & IActionProps & RouteComponentProps;

class App extends React.Component<IProps, IState> {
  public state: IState = {
    isLoadingUser: true,
  };

  public componentDidMount() {
    const { loadUser } = this.props;

    firebase.auth().onAuthStateChanged(() => loadUser());
  }

  public componentDidUpdate(prevProps: IProps) {
    if (this.isSuccessfulLoadUser(prevProps)) {
      this.setState({ isLoadingUser: false });
    }
  }

  public render() {
    const { isLoadingUser } = this.state;

    return isLoadingUser ? (
      <Preloader size={100} backgroundColor='rgba(0, 0, 0, 0.05)' isShown={isLoadingUser} />
    ) : (
      <>{this.props.children}</>
    );
  }

  private isSuccessfulLoadUser(prevProps: IProps) {
    const {
      loadUserCommunication: { isRequesting, error },
    } = this.props;
    const {
      loadUserCommunication: { isRequesting: prevIsRequesting },
    } = prevProps;

    return error === '' && !isRequesting && prevIsRequesting;
  }
}

const connectedComponent = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export { connectedComponent as App };
