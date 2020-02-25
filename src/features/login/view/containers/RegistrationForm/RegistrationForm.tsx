import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { Form, FormRenderProps } from 'react-final-form';

import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { ResolvedCommunication, ResolvedStatus } from 'shared/view/components';
import { TextInputField, CheckboxInputField } from 'shared/view/form';

import { actionCreators } from './../../../redux';
import { validateEmail, validatePassword } from '../constants';
import './RegistrationForm.scss';

type IStateProps = {
  registrationCommunication: ICommunication;
};
type OwnProps = {
  onLoginLinkClick: () => void;
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
  public render() {
    const { onLoginLinkClick } = this.props;

    return (
      <div className={b()}>
        <button type='button' className={b('login-link')} onClick={onLoginLinkClick}>
          Войти
        </button>
        <div className={b('title')}>Регистрация</div>
        <Form onSubmit={this.handleFormSubmit} render={this.renderForm} />
        {this.renderStatus()}
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
    return (
      <form onSubmit={handleSubmit} className={b('content')}>
        <div className={b('fields')}>
          <div className={b('field')}>
            <TextInputField name='email' label='Email' validate={validateEmail} />
          </div>
          <div className={b('field')}>
            <TextInputField
              name='password'
              type='password'
              label='Пароль'
              validate={validatePassword}
            />
          </div>
        </div>
        <ul className={b('password-tips-list')}>
          <li className={b('password-tips-item')}>Одна строчная буква</li>
          <li className={b('password-tips-item')}>Одна цифра</li>
          <li className={b('password-tips-item')}>Одна заглавная буква</li>
          <li className={b('password-tips-item')}>Минимум 8 знаков</li>
        </ul>
        <button type='submit' className={b('button')}>
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
          />
        </div>
      </form>
    );
  }

  private renderStatus() {
    const {
      registrationCommunication: { error },
      registrationCommunication,
    } = this.props;

    return (
      <div className={b('request-status')}>
        <ResolvedCommunication communication={registrationCommunication}>
          {(status: ResolvedStatus) => (
            <div className={b('status')}>
              {status === 'error' ? error : 'Registration success'}
            </div>
          )}
        </ResolvedCommunication>
      </div>
    );
  }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

export { connectedComponent as RegistrationForm };
