import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { Preloader } from 'shared/view/elements';
import { actionCreators as userActions } from 'services/user';

type IStateProps = {
  initUserCommunication: ICommunication;
};

type IActionProps = typeof mapDispatchToProps;

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    initUserCommunication: state.user.communication.initUser,
  };
}

const mapDispatchToProps = {
  initUser: userActions.initUser,
};

type IProps = IStateProps & IActionProps & RouteComponentProps;

class App extends React.Component<IProps> {
  public componentDidMount() {
    const { initUser } = this.props;

    initUser();
  }

  public render() {
    const {
      initUserCommunication: { isRequesting },
    } = this.props;

    return isRequesting ? (
      <Preloader size={100} backgroundColor='rgba(0, 0, 0, 0.05)' isShown={isRequesting} />
    ) : (
      <>{this.props.children}</>
    );
  }
}

const connectedComponent = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export { connectedComponent as App };
