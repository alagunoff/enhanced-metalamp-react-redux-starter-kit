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

type IStateProps = {
  loginCommunication: ICommunication;
};

type OwnProps = {
  onRestoreLinkClick: () => void;
  onRegistrationLinkClick: () => void;
  onSuccessfulLogin: () => void;
};

type LoginFormFields = {
  email: string;
  password: string;
};

type IActionProps = typeof mapDispatchToProps;

const mapStateToProps = (state: IAppReduxState): IStateProps => {
  return {
    loginCommunication: state.login.communication.login,
  };
};

const mapDispatchToProps = {
  login: actionCreators.login,
};

type IProps = IActionProps & IStateProps & OwnProps;

const b = block('login-form');

class LoginForm extends React.Component<IProps> {
  public componentDidUpdate(prevProps: IProps) {
    const { onSuccessfulLogin } = this.props;

    if (this.isSuccessfulLogin(prevProps)) {
      onSuccessfulLogin();
    }
  }

  public render() {
    const {
      onRegistrationLinkClick,
      loginCommunication: { error },
    } = this.props;

    return (
      <div className={b()}>
        <Button type='button' theme='with-arrow' onClick={onRegistrationLinkClick}>
          Зарегистрироваться
        </Button>
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
      onRestoreLinkClick,
      loginCommunication: { isRequesting },
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className={b('content')}>
        <div className={b('fields')}>
          <div className={b('field')}>
            <TextInputField
              name='email'
              label='Email'
              disabled={isRequesting}
            />
          </div>
          <div className={b('field')}>
            <TextInputField
              name='password'
              type='password'
              label='Пароль'
              disabled={isRequesting}
            />
          </div>
        </div>
        <div className={b('button-container')}>
          <button
            type='button'
            className={b('password-restore-link')}
            onClick={onRestoreLinkClick}
            disabled={isRequesting}
          >
            Восстановить пароль
          </button>
          <div className={b('button')}>
            <Button type='submit' disabled={isRequesting}>
              Войти
            </Button>
          </div>
        </div>
      </form>
    );
  }

  private isSuccessfulLogin(prevProps: IProps) {
    const {
      loginCommunication: { isRequesting, error },
    } = this.props;
    const {
      loginCommunication: { isRequesting: prevIsRequesting },
    } = prevProps;

    return error === '' && !isRequesting && prevIsRequesting;
  }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export { connectedComponent as LoginForm };
