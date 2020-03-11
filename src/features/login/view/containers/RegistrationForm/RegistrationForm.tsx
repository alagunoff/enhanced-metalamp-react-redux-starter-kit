import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { Form, FormRenderProps } from 'react-final-form';

import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { TextInputField, CheckboxInputField } from 'shared/view/form';

import { actionCreators } from './../../../redux';
import { validateEmail, validatePassword } from './../constants';

import './RegistrationForm.scss';

type IStateProps = {
  registrationCommunication: ICommunication;
  loginGoogleCommunication: ICommunication;
  loginFacebookCommunication: ICommunication;
};

type OwnProps = {
  onLoginLikClick: () => void;
  onSuccessfulRegistration: () => void;
  onSuccessfulLoginGoogle: () => void;
  onSuccessfulLoginFacebook: () => void;
};

type RegistrationFormFields = {
  email: string;
  password: string;
  refusalToSubscription: boolean;
};

type IActionProps = typeof mapDispatchToProps;

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

type IProps = IActionProps & IStateProps & OwnProps;

const b = block('registration-form');

class RegistrationForm extends React.Component<IProps> {
  public componentDidUpdate(prevProps: IProps) {
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
      onLoginLikClick,
      registrationCommunication: { error: registrationError },
      loginGoogleCommunication: { error: loginGoogleError },
      loginFacebookCommunication: { error: loginFacebookError },
    } = this.props;

    return (
      <div className={b()}>
        <button type='button' className={b('login-link')} onClick={onLoginLikClick}>
          Войти
        </button>
        <div className={b('title')}>Регистрация</div>
        <ul className={b('list')}>
          <li className={b('social-item')}>
            <button
              className={b('social-link registration-form__social-link_theme_google')}
              type='button'
              aria-label='sign in via google'
              onClick={this.handleGoogleLinkClick}
            ></button>
          </li>
          <li className={b('social-item')}>
            <button
              className={b('social-link registration-form__social-link_theme_facebook')}
              type='button'
              aria-label='sign in via facebook'
              onClick={this.handleFacebookLinkClick}
            ></button>
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
  private handleFormSubmit(formValues: RegistrationFormFields) {
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
              name='email'
              label='Email'
              validate={validateEmail}
              disabled={isRequesting}
            />
          </div>
          <div className={b('field')}>
            <TextInputField
              name='password'
              type='password'
              label='Пароль'
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
        <button type='submit' className={b('button')} disabled={isRequesting}>
          Зарегистрироваться
        </button>
        <div className={b('agreement')}>
          Нажимая на кнопку «Зарегистрироваться», вы подтверждаете свое согласие с условиями
          предоставления услуг (
          <a className={b('agreement-link')} href='/mock-address/change-me/' target='_blank'>
            Пользовательское соглашение
          </a>
          )
        </div>
        <div className={b('subscription-refusal')}>
          <CheckboxInputField
            name='refusalToSubscription'
            label='Я не хочу получать еженедельную рассылку с советами по поиску работы и новостях о самых
          востребованных профессиях'
            disabled={isRequesting}
          />
        </div>
      </form>
    );
  }

  private isSuccessfulRegistration(prevProps: IProps) {
    const {
      registrationCommunication: { isRequesting, error },
    } = this.props;
    const {
      registrationCommunication: { isRequesting: prevIsRequesting },
    } = prevProps;

    return error === '' && !isRequesting && prevIsRequesting;
  }

  private isSuccessfulLoginGoogle(prevProps: IProps) {
    const {
      loginGoogleCommunication: { isRequesting, error },
    } = this.props;
    const {
      loginGoogleCommunication: { isRequesting: prevIsRequesting },
    } = prevProps;

    return error === '' && !isRequesting && prevIsRequesting;
  }

  private isSuccessfulLoginFacebook(prevProps: IProps) {
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
