import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { Preloader } from 'shared/view/elements';
import { Api } from 'services/api/Api';
import { actionCreators as userActions } from 'services/user';

type IStateProps = {
  loadUserCommunication: ICommunication;
};

type IActionProps = typeof mapDispatchToProps;

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    loadUserCommunication: state.user.communication.loadUser,
  };
}

const mapDispatchToProps = {
  loadUser: userActions.loadUser,
};

type IProps = IStateProps & IActionProps & RouteComponentProps;

class App extends React.Component<IProps> {
  private api: Api = new Api();

  public componentDidMount() {
    const { loadUser } = this.props;

    this.api.onInitUser(loadUser);
  }

  public render() {
    const {
      loadUserCommunication: { isRequesting },
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
