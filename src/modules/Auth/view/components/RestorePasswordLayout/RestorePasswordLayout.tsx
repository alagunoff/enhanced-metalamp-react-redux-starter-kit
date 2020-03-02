import React from 'react';
import block from 'bem-cn';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { autobind } from 'core-decorators';

import { routes } from 'modules/routes';
import * as features from 'features';
import { withAsyncFeatures } from 'core';

import './RestorePasswordLayout.scss';

interface IFeatureProps {
  loginFeatureEntry: features.login.Entry;
}

type IProps = IFeatureProps & RouteComponentProps;

const b = block('restore-password-layout');

class RestorePasswordLayout extends React.PureComponent<IProps> {
  public render() {
    const {
      loginFeatureEntry: { containers },
    } = this.props;
    const { RestorePasswordForm } = containers;

    return (
      <div className={b()}>
        <div className={b('restore-password-form')}>
          <RestorePasswordForm
            onLoginLinkClick={this.handleLoginLinkClick}
            onSuccessfulRestorePassword={this.handleSuccessfulRestorePassword}
          />
        </div>
      </div>
    );
  }

  @autobind
  private handleSuccessfulRestorePassword() {
    this.redirectToLogin();
  }

  @autobind
  private handleLoginLinkClick() {
    this.redirectToLogin();
  }

  @autobind
  private redirectToLogin() {
    const { history } = this.props;

    history.push(routes.auth.login.getRedirectPath());
  }
}

const connectedComponent = withAsyncFeatures({
  loginFeatureEntry: features.login.loadEntry,
})(withRouter(RestorePasswordLayout));

export { connectedComponent as RestorePasswordLayout };
