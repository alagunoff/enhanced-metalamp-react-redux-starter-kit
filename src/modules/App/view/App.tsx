import React from 'react';
import { connect } from 'react-redux';

import { actionCreators } from 'services/user';

const mapDispatchToProps = {
  updateUser: actionCreators.updateUser,
};

type IActionProps = typeof mapDispatchToProps;
type IProps = IActionProps;

class App extends React.Component<IProps> {
  componentDidMount() {
    const { updateUser } = this.props;
    const user = localStorage.getItem('authUser');

    if (user !== null) {
      updateUser(JSON.parse(user));
    }
  }

  render() {
    return <>{this.props.children}</>;
  }
}

const connectedComponent = connect(null, mapDispatchToProps)(App);

export { connectedComponent as App };
