import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { Preloader } from 'shared/view/elements';
import { actionCreators as userActions } from 'services/user';

interface IStateProps {
  loadUserCommunication: ICommunication;
}

type ActionProps = typeof mapDispatchToProps;

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    loadUserCommunication: state.user.communication.loadUser,
  };
}

const mapDispatchToProps = {
  loadUser: userActions.loadUser,
};

type Props = ActionProps & IStateProps & RouteComponentProps;

class App extends React.Component<Props> {
  public componentDidMount() {
    const { loadUser } = this.props;

    loadUser();
  }

  public render() {
    const {
      children,
      loadUserCommunication: { isRequesting },
    } = this.props;

    return isRequesting ? (
      <Preloader size={100} backgroundColor="rgba(0, 0, 0, 0.05)" isShown={isRequesting} />
    ) : (
      <>{children}</>
    );
  }
}

const connectedComponent = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export { connectedComponent as App };
