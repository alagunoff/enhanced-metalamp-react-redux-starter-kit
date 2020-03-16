import React from 'react';
import block from 'bem-cn';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { autobind } from 'core-decorators';

import { routes } from 'modules/routes';
import * as features from 'features';
import { withAsyncFeatures } from 'core';

import './LoginLayout.scss';

type IFeatureProps = {
  loginFeatureEntry: features.login.Entry;
};

type IProps = IFeatureProps & RouteComponentProps;

const b = block('login-layout');

class LoginLayout extends React.Component<IProps> {
  public render() {
    const {
      loginFeatureEntry: { containers },
    } = this.props;
    const { LoginForm } = containers;

    return (
      <div className={b()}>
        <div className={b('login-form')}>
          <LoginForm
            onRestoreLinkClick={this.handleRestoreLinkClick}
            onRegistrationLinkClick={this.handleRegistrationLinkClick}
            onSuccessfulLogin={this.handleSuccessfulLogin}
            onSuccessfulLoginGoogle={this.handleSuccessfulLoginGoogle}
            onSuccessfulLoginFacebook={this.handleSuccessfulLoginFacebook}
          />
        </div>
      </div>
    );
  }

  @autobind
  private handleSuccessfulLogin() {
    this.redirectToSearchRepositories();
  }

  @autobind
  private handleSuccessfulLoginGoogle() {
    this.redirectToSearchRepositories();
  }

  @autobind
  private handleSuccessfulLoginFacebook() {
    this.redirectToSearchRepositories();
  }

  @autobind
  private handleRestoreLinkClick() {
    const { history } = this.props;

    history.push(routes.auth['restore-password'].getRedirectPath());
  }

  @autobind
  private handleRegistrationLinkClick() {
    const { history } = this.props;

    history.push(routes.auth.registration.getRedirectPath());
  }

  private redirectToSearchRepositories() {
    const { history } = this.props;

    history.push(routes.search.repositories.getRedirectPath());
  }
}

const connectedComponent = withAsyncFeatures({
  loginFeatureEntry: features.login.loadEntry,
})(withRouter(LoginLayout));

export { connectedComponent as LoginLayout };
