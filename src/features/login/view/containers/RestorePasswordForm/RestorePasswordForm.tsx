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
  onSuccessfulRestorePassword: () => void;
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
  public componentDidUpdate(prevProps: IProps) {
    const { onSuccessfulRestorePassword } = this.props;

    if (this.isSuccessfulRestorePassword(prevProps)) {
      onSuccessfulRestorePassword();
    }
  }

  public render() {
    const {
      onLoginLinkClick,
      restorePasswordCommunication: { error },
    } = this.props;

    return (
      <div className={b()}>
        <button type='button' className={b('login-link')} onClick={onLoginLinkClick}>
          Войти
        </button>
        <div className={b('title')}>Восстановить пароль</div>
        <div className={b('text')}>
          Напомните нам вашу почту, и мы поможем вам восстановить пароль
        </div>
        <Form onSubmit={this.handleFormSubmit} render={this.renderForm} />
        {error !== '' ? error : null}
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
    const {
      restorePasswordCommunication: { isRequesting },
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className={b('content')}>
        <div className={b('field')}>
          <TextInputField
            name='email'
            label='Email'
            validate={validateEmail}
            disabled={isRequesting}
          />
        </div>
        <button type='submit' className={b('button')} disabled={isRequesting}>
          Отправить новый пароль
        </button>
      </form>
    );
  }

  @autobind
  private isSuccessfulRestorePassword(prevProps: IProps) {
    const {
      restorePasswordCommunication: { isRequesting, error },
    } = this.props;
    const {
      restorePasswordCommunication: { isRequesting: isPrevRequesting },
    } = prevProps;

    return error === '' && !isRequesting && isPrevRequesting;
  }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(RestorePasswordForm);

export { connectedComponent as RestorePasswordForm };
