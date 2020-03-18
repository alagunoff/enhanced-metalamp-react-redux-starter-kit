import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { Form, FormRenderProps } from 'react-final-form';

import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { TextInputField, CheckboxInputField } from 'shared/view/form';
import { Button } from 'shared/view/elements';

import { actionCreators } from '../../../redux';
import { validateEmail, validatePassword } from '../constants';

import './RegistrationForm.scss';

interface IStateProps {
  registrationCommunication: ICommunication;
  loginGoogleCommunication: ICommunication;
  loginFacebookCommunication: ICommunication;
}

interface IOwnProps {
  onLoginLinkClick: () => void;
  onSuccessfulRegistration: () => void;
  onSuccessfulLoginGoogle: () => void;
  onSuccessfulLoginFacebook: () => void;
}

interface IRegistrationFormFields {
  email: string;
  password: string;
  refusalToSubscription: boolean;
}

type ActionProps = typeof mapDispatchToProps;

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    registrationCommunication: state.login.communication.registration,
    loginGoogleCommunication: state.login.communication.loginGoogle,
    loginFacebookCommunication: state.login.communication.loginFacebook,
  };
}

const mapDispatchToProps = {
  registration: actionCreators.registration,
  loginGoogle: actionCreators.loginGoogle,
  loginFacebook: actionCreators.loginFacebook,
};

type Props = ActionProps & IStateProps & IOwnProps;

const b = block('registration-form');

class RegistrationForm extends React.Component<Props> {
  public componentDidUpdate(prevProps: Props) {
    const {
      onSuccessfulRegistration,
      onSuccessfulLoginGoogle,
      onSuccessfulLoginFacebook,
    } = this.props;

    if (this.isSuccessfulRegistration(prevProps)) {
      onSuccessfulRegistration();
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
      onLoginLinkClick,
      registrationCommunication: { error: registrationError },
      loginGoogleCommunication: { error: loginGoogleError },
      loginFacebookCommunication: { error: loginFacebookError },
    } = this.props;

    return (
      <div className={b()}>
        <Button type="button" theme="with-arrow" onClick={onLoginLinkClick}>
          Войти
        </Button>
        <div className={b('title')}>Регистрация</div>
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
        {registrationError !== '' ? registrationError : null}
        {loginGoogleError !== '' ? loginGoogleError : null}
        {loginFacebookError !== '' ? loginFacebookError : null}
      </div>
    );
  }

  @autobind
  private handleFormSubmit(formValues: IRegistrationFormFields) {
    const { registration } = this.props;

    registration(formValues);
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
      registrationCommunication: { isRequesting },
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className={b('content')}>
        <div className={b('fields')}>
          <div className={b('field')}>
            <TextInputField
              name="email"
              label="Email"
              validate={validateEmail}
              disabled={isRequesting}
            />
          </div>
          <div className={b('field')}>
            <TextInputField
              name="password"
              type="password"
              label="Пароль"
              validate={validatePassword}
              disabled={isRequesting}
            />
          </div>
        </div>
        <ul className={b('password-tips-list')}>
          <li className={b('password-tips-item')}>Одна строчная буква</li>
          <li className={b('password-tips-item')}>Одна цифра</li>
          <li className={b('password-tips-item')}>Одна заглавная буква</li>
          <li className={b('password-tips-item')}>Минимум 8 знаков</li>
        </ul>
        <div className={b('button')}>
          <Button type="submit" disabled={isRequesting}>
            Зарегистрироваться
          </Button>
        </div>
        <div className={b('agreement')}>
          Нажимая на кнопку «Зарегистрироваться», вы подтверждаете свое согласие с условиями
          предоставления услуг (
          <a className={b('agreement-link')} href="/mock-address/change-me/" target="_blank">
            Пользовательское&nbsp;соглашение
          </a>
          )
        </div>
        <div className={b('subscription-refusal')}>
          <CheckboxInputField
            name="refusalToSubscription"
            label="Я не хочу получать еженедельную рассылку с советами по поиску работы и новостях о самых
          востребованных профессиях"
            disabled={isRequesting}
          />
        </div>
      </form>
    );
  }

  private isSuccessfulRegistration(prevProps: Props) {
    const {
      registrationCommunication: { isRequesting, error },
    } = this.props;
    const {
      registrationCommunication: { isRequesting: prevIsRequesting },
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

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

export { connectedComponent as RegistrationForm };
