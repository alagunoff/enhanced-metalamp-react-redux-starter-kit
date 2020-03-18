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
import { validateEmail } from '../constants';

import './RestorePasswordForm.scss';

interface IStateProps {
  restorePasswordCommunication: ICommunication;
}

interface IOwnProps {
  onLoginLinkClick: () => void;
  onSuccessfulRestorePassword: () => void;
}

interface IRestorePasswordFormFields {
  email: string;
}

type ActionProps = typeof mapDispatchToProps;

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    restorePasswordCommunication: state.login.communication.restorePassword,
  };
}

const mapDispatchToProps = {
  restorePassword: actionCreators.restorePassword,
};

type Props = ActionProps & IStateProps & IOwnProps;

const b = block('restore-password-form');

class RestorePasswordForm extends React.Component<Props> {
  public componentDidUpdate(prevProps: Props) {
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
        <Button type="button" theme="with-arrow" onClick={onLoginLinkClick}>
          Войти
        </Button>
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
  private handleFormSubmit(formValues: IRestorePasswordFormFields) {
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
            name="email"
            label="Email"
            validate={validateEmail}
            disabled={isRequesting}
          />
        </div>
        <Button type="submit" disabled={isRequesting}>
          Отправить новый пароль
        </Button>
      </form>
    );
  }

  private isSuccessfulRestorePassword(prevProps: Props) {
    const {
      restorePasswordCommunication: { isRequesting, error },
    } = this.props;
    const {
      restorePasswordCommunication: { isRequesting: prevIsRequesting },
    } = prevProps;

    return error === '' && !isRequesting && prevIsRequesting;
  }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(RestorePasswordForm);

export { connectedComponent as RestorePasswordForm };
