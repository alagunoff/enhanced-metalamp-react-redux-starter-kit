import React from 'react';
import block from 'bem-cn';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { autobind } from 'core-decorators';

import { routes } from 'modules/routes';
import * as features from 'features';
import { withAsyncFeatures } from 'core';

import './LoginLayout.scss';

interface IFeatureProps {
  loginFeatureEntry: features.login.Entry;
}

type IProps = IFeatureProps & RouteComponentProps;

const b = block('login-layout');

class LoginLayout extends React.PureComponent<IProps> {
  public render() {
    const {
      loginFeatureEntry: { containers },
    } = this.props;
    const { LoginForm } = containers;

    return (
      <div className={b()}>
        <div className={b('login-form')}>
          <LoginForm
            onRestoreLinkClick={this.redirectToChangePassword}
            onRegistrationLinkClick={this.redirectToRegistration}
          />
        </div>
      </div>
    );
  }

  @autobind
  private redirectToChangePassword() {
    const { history } = this.props;

    history.push(routes.auth['restore-password'].getRedirectPath());
  }

  @autobind
  private redirectToRegistration() {
    const { history } = this.props;

    history.push(routes.auth['registration'].getRedirectPath());
  }
}

const connectedComponent = withAsyncFeatures({
  loginFeatureEntry: features.login.loadEntry,
})(withRouter(LoginLayout));

export { connectedComponent as LoginLayout };
