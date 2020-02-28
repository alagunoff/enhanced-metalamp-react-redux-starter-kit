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
};
type OwnProps = {
  onLoginLikClick: () => void;
  onSuccessfulRegistration: () => void;
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
    registrationCommunication: state.login.communication.registration,
  };
}

const mapDispatchToProps = {
  registration: actionCreators.registration,
};

const b = block('registration-form');

class RegistrationForm extends React.PureComponent<IProps> {
  componentDidUpdate(prevProps: IProps) {
    const {
      onSuccessfulRegistration,
      registrationCommunication: { isRequesting, error },
    } = this.props;
    const {
      registrationCommunication: { isRequesting: isPrevRequesting },
    } = prevProps;
    const isSuccessfulRegistration = error === '' && !isRequesting && isPrevRequesting;

    if (isSuccessfulRegistration) {
      onSuccessfulRegistration();
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
