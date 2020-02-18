import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
// import { autobind } from 'core-decorators';

import { IAppReduxState } from 'shared/types/app';

import { selectors } from '../../../redux';
import './LoginForm.scss';

const b = block('login-form');

function mapState(state: IAppReduxState) {
  return {
    profile: selectors.selectProfile(state),
  };
}

class ProfilePreviewComponent extends React.PureComponent {
  public render() {
    return (
      <div className={b()}>
        login form
      </div>
    );
  }

}

const connectedComponent = connect(mapState)(ProfilePreviewComponent);

export { connectedComponent as LoginForm };
