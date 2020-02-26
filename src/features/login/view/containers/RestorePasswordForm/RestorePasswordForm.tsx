import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { Form, FormRenderProps } from 'react-final-form';

import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { TextInputField } from 'shared/view/form';

import { actionCreators } from './../../../redux';
import { validateEmail } from './../constants';

import './RestorePasswordForm.scss';

type IStateProps = {
  restorePasswordCommunication: ICommunication;
};
type OwnProps = {
  onLoginLinkClick: () => void;
};
type RestorePasswordFormFields = {
  email: string;
};
type IActionProps = typeof mapDispatchToProps;
type IProps = IActionProps & IStateProps & OwnProps;

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    restorePasswordCommunication: state.login.communication.restorePassword,
  };
}

const mapDispatchToProps = {
  restorePassword: actionCreators.restorePassword,
};

const b = block('restore-password-form');

class RestorePasswordForm extends React.PureComponent<IProps> {
  public render() {
    const { onLoginLinkClick } = this.props;

    return (
      <div className={b()}>
        <button type='button' className={b('login-link')} onClick={onLoginLinkClick}>
          Войти
        </button>
        <div className={b('title')}>Восстановить пароль</div>
        <Form onSubmit={this.handleFormSubmit} render={this.renderForm} />
      </div>
    );
  }

  @autobind
  private handleFormSubmit(formValues: RestorePasswordFormFields) {
    const { restorePassword } = this.props;

    restorePassword(formValues);
  }

  @autobind
  private renderForm({ handleSubmit }: FormRenderProps) {
    return (
      <form onSubmit={handleSubmit} className={b('content')}>
        <div className={b('text')}>Напомните нам вашу почту, и мы пришлем новый пароль</div>
        <div className={b('field')}>
          <TextInputField name='email' label='Email' validate={validateEmail} />
        </div>
        <button type='submit' className={b('button')}>
          Отправить новый пароль
        </button>
      </form>
    );
  }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(RestorePasswordForm);

export { connectedComponent as RestorePasswordForm };
