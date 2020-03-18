import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { Form, FormRenderProps } from 'react-final-form';

import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { TextInputField } from 'shared/view/form';
import { Button } from 'shared/view/elements';

import { actionCreators } from '../../../redux';

import './LoginForm.scss';

interface IStateProps {
  loginCommunication: ICommunication;
  loginGoogleCommunication: ICommunication;
  loginFacebookCommunication: ICommunication;
}

interface OwnProps {
  onRestoreLinkClick: () => void;
  onRegistrationLinkClick: () => void;
  onSuccessfulLogin: () => void;
  onSuccessfulLoginGoogle: () => void;
  onSuccessfulLoginFacebook: () => void;
}

interface LoginFormFields {
  email: string;
  password: string;
}

type ActionProps = typeof mapDispatchToProps;

const mapStateToProps = (state: IAppReduxState): IStateProps => ({
  loginCommunication: state.login.communication.login,
  loginGoogleCommunication: state.login.communication.loginGoogle,
  loginFacebookCommunication: state.login.communication.loginFacebook,
});

const mapDispatchToProps = {
  login: actionCreators.login,
  loginGoogle: actionCreators.loginGoogle,
  loginFacebook: actionCreators.loginFacebook,
};

type Props = ActionProps & IStateProps & OwnProps;

const b = block('login-form');

class LoginForm extends React.Component<Props> {
  public componentDidUpdate(prevProps: Props) {
    const { onSuccessfulLogin, onSuccessfulLoginGoogle, onSuccessfulLoginFacebook } = this.props;

    if (this.isSuccessfulLogin(prevProps)) {
      onSuccessfulLogin();
    }

    if (this.isSuccessfulLoginGoogle(prevProps)) {
      onSuccessfulLoginGoogle();
    }

    if (this.isSuccessfulLoginFacebook(prevProps)) {
      onSuccessfulLoginFacebook();
    }
  }

  public render() {
    const {
      onRegistrationLinkClick,
      loginCommunication: { error: loginError },
      loginGoogleCommunication: { error: loginGoogleError },
      loginFacebookCommunication: { error: loginFacebookError },
    } = this.props;

    return (
      <div className={b()}>
        <Button type="button" theme="with-arrow" onClick={onRegistrationLinkClick}>
          Зарегистрироваться
        </Button>
        <div className={b('title')}>Войти</div>
        <ul className={b('list')}>
          <li className={b('social-item')}>
            <button
              className={b('social-link', { theme: 'google' })}
              type="button"
              aria-label="sign in via google"
              onClick={this.handleGoogleLinkClick}
            />
          </li>
          <li className={b('social-item')}>
            <button
              className={b('social-link', { theme: 'facebook' })}
              type="button"
              aria-label="sign in via facebook"
              onClick={this.handleFacebookLinkClick}
            />
          </li>
        </ul>
        <div className={b('text')}>или</div>
        <Form onSubmit={this.handleFormSubmit} render={this.renderForm} />
        {loginError !== '' ? loginError : null}
        {loginGoogleError !== '' ? loginGoogleError : null}
        {loginFacebookError !== '' ? loginFacebookError : null}
      </div>
    );
  }

  @autobind
  private handleFormSubmit(formValues: LoginFormFields) {
    const { login } = this.props;

    login(formValues);
  }

  @autobind
  private handleGoogleLinkClick() {
    const { loginGoogle } = this.props;

    loginGoogle();
  }

  @autobind
  private handleFacebookLinkClick() {
    const { loginFacebook } = this.props;

    loginFacebook();
  }

  @autobind
  private renderForm({ handleSubmit }: FormRenderProps) {
    const {
      onRestoreLinkClick,
      loginCommunication: { isRequesting },
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className={b('content')}>
        <div className={b('fields')}>
          <div className={b('field')}>
            <TextInputField name="email" label="Email" disabled={isRequesting} />
          </div>
          <div className={b('field')}>
            <TextInputField
              name="password"
              type="password"
              label="Пароль"
              disabled={isRequesting}
            />
          </div>
        </div>
        <div className={b('button-container')}>
          <button
            type="button"
            className={b('password-restore-link')}
            onClick={onRestoreLinkClick}
            disabled={isRequesting}
          >
            Восстановить пароль
          </button>
          <div className={b('button')}>
            <Button type="submit" disabled={isRequesting}>
              Войти
            </Button>
          </div>
        </div>
      </form>
    );
  }

  private isSuccessfulLogin(prevProps: Props) {
    const {
      loginCommunication: { isRequesting, error },
    } = this.props;
    const {
      loginCommunication: { isRequesting: prevIsRequesting },
    } = prevProps;

    return error === '' && !isRequesting && prevIsRequesting;
  }

  private isSuccessfulLoginGoogle(prevProps: Props) {
    const {
      loginGoogleCommunication: { isRequesting, error },
    } = this.props;
    const {
      loginGoogleCommunication: { isRequesting: prevIsRequesting },
    } = prevProps;

    return error === '' && !isRequesting && prevIsRequesting;
  }

  private isSuccessfulLoginFacebook(prevProps: Props) {
    const {
      loginFacebookCommunication: { isRequesting, error },
    } = this.props;
    const {
      loginFacebookCommunication: { isRequesting: prevIsRequesting },
    } = prevProps;

    return error === '' && !isRequesting && prevIsRequesting;
  }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export { connectedComponent as LoginForm };
