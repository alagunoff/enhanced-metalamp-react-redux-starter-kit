import React from 'react';
import block from 'bem-cn';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { autobind } from 'core-decorators';

import { namespace as UserNamespace } from 'services/user';
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
            onRestoreLinkClick={this.handleRestoreLinkClick}
            onRegistrationLinkClick={this.handleRegistrationLinkClick}
            onSuccessfulLogin={this.handleSuccessfulLogin}
          />
        </div>
      </div>
    );
  }

  @autobind
  private handleSuccessfulLogin(user: UserNamespace.IUser) {
    const { history } = this.props;

    localStorage.setItem('authUser', JSON.stringify(user));
    
    history.push(routes.search.repositories.getRedirectPath());
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
}

const connectedComponent = withAsyncFeatures({
  loginFeatureEntry: features.login.loadEntry,
})(withRouter(LoginLayout));

export { connectedComponent as LoginLayout };
