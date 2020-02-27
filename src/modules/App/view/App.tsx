import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { SessionContext } from 'core/session';

class App extends React.Component {
  public state = {
    authUser: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(authUser => {
      authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
    });
  }

  render() {
    return (
      <SessionContext.Provider value={this.state.authUser}>
        {this.props.children}
      </SessionContext.Provider>
    );
  }
}

export { App };
