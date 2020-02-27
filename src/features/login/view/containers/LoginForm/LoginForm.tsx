import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { Form, FormRenderProps } from 'react-final-form';

import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { TextInputField } from 'shared/view/form';

import { actionCreators } from './../../../redux';
import { validateEmail, validatePassword } from '../constants';

import './LoginForm.scss';

interface IStateProps {
  loginCommunication: ICommunication;
}

type OwnProps = {
  handleRestoreLinkClick: () => void;
  handleRegistrationLinkClick: () => void;
  handleSuccessfulLogin: () => void;
};
type LoginFormFields = {
  email: string;
  password: string;
};
type IActionProps = typeof mapDispatchToProps;
type IProps = IActionProps & IStateProps & OwnProps;

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    loginCommunication: state.login.communication.login,
  };
}

const mapDispatchToProps = {
  login: actionCreators.login,
};

const b = block('login-form');

class LoginForm extends React.PureComponent<IProps> {
  componentDidUpdate() {
    const {
      handleSuccessfulLogin,
      loginCommunication: { isRequesting, error },
    } = this.props;

    if (error === '' && !isRequesting) {
      setTimeout(() => handleSuccessfulLogin(), 1000);
    }
  }

  public render() {
    const {
      handleRegistrationLinkClick,
      loginCommunication: { error },
    } = this.props;

    return (
      <div className={b()}>
        <button
          type='button'
          className={b('registration-link')}
          onClick={handleRegistrationLinkClick}
        >
          Зарегистрироваться
        </button>
        <div className={b('title')}>Войти</div>
        <Form onSubmit={this.handleFormSubmit} render={this.renderForm} />
        {error !== '' ? error : null}
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
    const {
      handleRestoreLinkClick,
      loginCommunication: { isRequesting },
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className={b('content')}>
        <div className={b('fields')}>
          <div className={b('field')}>
            <TextInputField name='email' label='Email' validate={validateEmail} disabled={isRequesting} />
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
        <div className={b('button-container')}>
          <button
            type='button'
            className={b('password-restore-link')}
            onClick={handleRestoreLinkClick}
            disabled={isRequesting}
          >
            Восстановить пароль
          </button>
          <button type='submit' className={b('button')} disabled={isRequesting}>
            Войти
          </button>
        </div>
      </form>
    );
  }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export { connectedComponent as LoginForm };
