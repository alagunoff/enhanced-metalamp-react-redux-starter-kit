import React from 'react';
import block from 'bem-cn';
import { autobind } from 'core-decorators';

import * as features from 'features';
import { withAsyncFeatures } from 'core';

//import './LoginLayout.scss';

const b = block('login-layout');

class LoginLayout extends React.Component {
  public render() {
    console.log(this.props);

    return (
      <div className={b()}>
        <div className={b('search-form')}>result</div>
      </div>
    );
  }
}

const connectedComponent = withAsyncFeatures({
  loginFeatureEntry: features.login.loadEntry,
})(LoginLayout);

export { connectedComponent as LoginLayout };
