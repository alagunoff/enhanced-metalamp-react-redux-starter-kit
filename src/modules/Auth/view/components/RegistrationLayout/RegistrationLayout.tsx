import React from 'react';
import block from 'bem-cn';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { autobind } from 'core-decorators';

import { routes } from 'modules/routes';
import * as features from 'features';
import { withAsyncFeatures } from 'core';

import './RegistrationLayout.scss';

interface IFeatureProps {
  loginFeatureEntry: features.login.Entry;
}

type IProps = IFeatureProps & RouteComponentProps;

const b = block('registration-layout');

class RegistrationLayout extends React.Component<IProps> {
  public render() {
    const {
      loginFeatureEntry: { containers },
    } = this.props;
    const { RegistrationForm } = containers;

    return (
      <div className={b()}>
        <div className={b('registration-form')}>
          <RegistrationForm
            onLoginLikClick={this.handleLoginLikClick}
            onSuccessfulRegistration={this.handleSuccessfulRegistration}
            onSuccessfulLoginGoogle={this.handleSuccessfulLoginGoogle}
            onSuccessfulLoginFacebook={this.handleSuccessfulLoginFacebook}
          />
        </div>
      </div>
    );
  }

  @autobind
  private handleLoginLikClick() {
    this.redirectToLogin();
  }

  @autobind
  private handleSuccessfulRegistration() {
    this.redirectToLogin();
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
  private redirectToLogin() {
    const { history } = this.props;

    history.push(routes.auth.login.getRedirectPath());
  }

  @autobind
  private redirectToSearchRepositories() {
    const { history } = this.props;

    history.push(routes.search.repositories.getRedirectPath());
  }
}

const connectedComponent = withAsyncFeatures({
  loginFeatureEntry: features.login.loadEntry,
})(withRouter(RegistrationLayout));

export { connectedComponent as RegistrationLayout };
