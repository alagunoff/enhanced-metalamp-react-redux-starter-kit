import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { Form, FormRenderProps } from 'react-final-form';

import { IAppReduxState } from 'shared/types/app';
import { TextInputField } from 'shared/view/form';

import { actionCreators } from './../../../redux';
import { validateEmail, validatePassword } from '../constants';
import './LoginForm.scss';

interface IStateProps {
  isLoginRequesting: boolean;
}

type OwnProps = {
  onRestoreLinkClick: () => void;
  onRegistrationLinkClick: () => void;
};
type LoginFormFields = {
  email: string;
  password: string;
};
type IActionProps = typeof mapDispatchToProps;
type IProps = IActionProps & IStateProps & OwnProps;

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    isLoginRequesting: state.login.communication.login.isRequesting,
  };
}

const mapDispatchToProps = {
  login: actionCreators.login,
};

const b = block('login-form');

class LoginForm extends React.PureComponent<IProps> {
  public render() {
    const { onRegistrationLinkClick } = this.props;

    return (
      <div className={b()}>
        <button type='button' className={b('registration-link')} onClick={onRegistrationLinkClick}>
          Зарегистрироваться
        </button>
        <div className={b('title')}>Войти</div>
        <Form onSubmit={this.handleFormSubmit} render={this.renderForm} />
      </div>
    );
  }

  @autobind
  private handleFormSubmit(formValues: LoginFormFields) {
    const { login } = this.props;
    
    login(formValues);
  }

  @autobind
  private renderForm({ handleSubmit }: FormRenderProps) {
    const { onRestoreLinkClick } = this.props;

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
        <div className={b('button-container')}>
          <button type='button' className={b('password-restore-link')} onClick={onRestoreLinkClick}>
            Восстановить пароль
          </button>
          <button type='submit' className={b('button')}>
            Войти
          </button>
        </div>
      </form>
    );
  }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export { connectedComponent as LoginForm };
