import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { Form, FormRenderProps } from 'react-final-form';
import { autobind } from 'core-decorators';

import { TextInputField, NumberInputField } from 'shared/view/form';
import { Button } from 'shared/view/elements';
import { IAppReduxState } from 'shared/types/app';
import { actionCreators as notificationActionCreators } from 'services/notification';
import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';

import { IUser } from '../../../namespace';
import { actionCreators } from '../../../redux';
import { UserAvatar } from '../../components';
import { validateName, validateEmail, validateNickname, validateBio } from './constants';

import './UserEdit.scss';

interface IStateProps {
  user: IUser | null;
}

type IActionProps = typeof mapDispatchToProps;

type IProps = IStateProps & IActionProps & ITranslationProps;

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    user: state.user.data.user,
  };
}

const mapDispatchToProps = {
  updateUser: actionCreators.updateUser,
  setNotification: notificationActionCreators.setNotification,
};

const b = block('user-edit');
const { user: intl } = tKeys.services;

class UserEdit extends React.PureComponent<IProps> {
  public render() {
    const { user } = this.props;

    if (user === null) {
      return;
    }

    return (
      <Form
        onSubmit={this.handleFormSubmit}
        initialValues={user}
        render={this.renderForm}
        subscription={{}}
      />
    );
  }

  @autobind
  private renderForm({ handleSubmit }: FormRenderProps) {
    const { user, t } = this.props;

    if (user === null) {
      return;
    }

    const { avatarURL } = user;

    return (
      <form onSubmit={handleSubmit} className={b()}>
        <div className={b('avatar')}>
          <UserAvatar avatarURL={avatarURL} size='big' />
        </div>
        <div className={b('fields')}>
          <div className={b('field')}>
            <TextInputField
              name='name'
              label={t(intl.name)}
              validate={validateName}
              t={t}
            />
          </div>
          <div className={b('field')}>
            <TextInputField
              name='email'
              label={t(intl.email)}
              validate={validateEmail}
              t={t}
            />
          </div>
          <div className={b('field')}>
            <TextInputField
              name='nickname'
              label={t(intl.nickname)}
              validate={validateNickname}
              t={t}
            />
          </div>
          <div className={b('field')}>
            <NumberInputField name='age' label={t(intl.age)} t={t} />
          </div>
          <div className={b('field')}>
            <TextInputField
              name='bio'
              label={t(intl.bio)}
              multiline
              rowsMax={10}
              validate={validateBio}
              t={t}
            />
          </div>
          <div className={b('button')}>
            <Button variant='outlined' type='submit'>
              {t(tKeys.shared.save)}
            </Button>
          </div>
        </div>
      </form>
    );
  }

  @autobind
  private handleFormSubmit(values: IUser) {
    const { updateUser, setNotification, t } = this.props;

    updateUser(values);
    setNotification({ kind: 'info', text: t(tKeys.shared.notifications.saved) });
  }
}

const connectedComponent = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(UserEdit),
);

export { connectedComponent as UserEdit };
