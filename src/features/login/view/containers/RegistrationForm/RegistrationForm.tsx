import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { Form, FormRenderProps } from 'react-final-form';

import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { TextInputField, CheckboxInputField } from 'shared/view/form';
import { namespace as UserNamespace } from 'services/user';

import { actionCreators } from './../../../redux';
import { validateEmail, validatePassword } from './../constants';

import './RegistrationForm.scss';

type IStateProps = {
  user: UserNamespace.IUser;
  registrationCommunication: ICommunication;
  loginGoogleCommunication: ICommunication;
  loginTwitterCommunication: ICommunication;
  loginFacebookCommunication: ICommunication;
};
type OwnProps = {
  onLoginLikClick: () => void;
  onSuccessfulRegistration: () => void;
  onSuccessfulLoginGoogle: (user: UserNamespace.IUser) => void;
  onSuccessfulLoginTwitter: (user: UserNamespace.IUser) => void;
  onSuccessfulLoginFacebook: (user: UserNamespace.IUser) => void;
};
type RegistrationFormFields = {
  email: string;
  password: string;
  refusalToSubscription: boolean;
};
type IActionProps = typeof mapDispatchToProps;
type IProps = IActionProps & IStateProps & OwnProps;

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    user: state.user.data.user,
    registrationCommunication: state.login.communication.registration,
    loginGoogleCommunication: state.login.communication.loginGoogle,
    loginTwitterCommunication: state.login.communication.loginTwitter,
    loginFacebookCommunication: state.login.communication.loginFacebook,
  };
}

const mapDispatchToProps = {
  registration: actionCreators.registration,
  loginGoogle: actionCreators.loginGoogle,
  loginTwitter: actionCreators.loginTwitter,
  loginFacebook: actionCreators.loginFacebook,
};

const b = block('registration-form');

class RegistrationForm extends React.PureComponent<IProps> {
  public componentDidUpdate(prevProps: IProps) {
    const {
      user,
      onSuccessfulRegistration,
      onSuccessfulLoginGoogle,
      onSuccessfulLoginTwitter,
      onSuccessfulLoginFacebook,
      registrationCommunication: { isRequesting, error },
      loginGoogleCommunication: { isRequesting: isLoginGoogleRequesting, error: loginGoggleError },
      loginTwitterCommunication: {
        isRequesting: isLoginTwitterRequesting,
        error: loginTwitterError,
      },
      loginFacebookCommunication: {
        isRequesting: isLoginFacebookRequesting,
        error: loginFacebookError,
      },
    } = this.props;
    const {
      registrationCommunication: { isRequesting: isPrevRequesting },
      loginGoogleCommunication: { isRequesting: isPrevLoginGoogleRequesting },
      loginTwitterCommunication: { isRequesting: isPrevLoginTwitterRequesting },
      loginFacebookCommunication: { isRequesting: isPrevLoginFacebookRequesting },
    } = prevProps;
    const isSuccessfulRegistration = error === '' && !isRequesting && isPrevRequesting;
    const isSuccessfulLoginGoogle =
      loginGoggleError === '' && !isLoginGoogleRequesting && isPrevLoginGoogleRequesting;
    const isSuccessfulLoginTwitter =
      loginTwitterError === '' && !isLoginTwitterRequesting && isPrevLoginTwitterRequesting;
    const isSuccessfulLoginFacebook =
      loginFacebookError === '' && !isLoginFacebookRequesting && isPrevLoginFacebookRequesting;

    if (isSuccessfulRegistration) {
      onSuccessfulRegistration();
    }

    if (isSuccessfulLoginGoogle) {
      onSuccessfulLoginGoogle(user);
    }

    if (isSuccessfulLoginTwitter) {
      onSuccessfulLoginTwitter(user);
    }

    if (isSuccessfulLoginFacebook) {
      onSuccessfulLoginFacebook(user);
    }
  }

  public render() {
    const {
      onLoginLikClick,
      registrationCommunication: { error },
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
              className={b('social-link registration-form__social-link_theme_twitter')}
              type='button'
              aria-label='sign in via twitter'
            ></button>
          </li>
          <li className={b('social-item')}>
            <button
              className={b('social-link registration-form__social-link_theme_facebook')}
              type='button'
              aria-label='sign in via facebook'
            ></button>
          </li>
        </ul>
        <div className={b('text')}>или</div>
        <Form onSubmit={this.handleFormSubmit} render={this.renderForm} />
        {error !== '' ? error : null}
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
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

export { connectedComponent as RegistrationForm };
