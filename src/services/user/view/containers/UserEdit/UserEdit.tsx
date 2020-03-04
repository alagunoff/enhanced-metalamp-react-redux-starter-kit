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

import { IUserFields } from '../../../namespace';
import { actionCreators } from '../../../redux';
import { UserAvatar } from '../../components';
import { validateName, validateNickname, validateBio } from './constants';

import './UserEdit.scss';

interface IStateProps {
  user: IUserFields;
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
    return <Form onSubmit={this.handleFormSubmit} render={this.renderForm} subscription={{}} />;
  }

  @autobind
  private renderForm({ handleSubmit }: FormRenderProps) {
    const {
      user: { avatarURL, name, nickname, age, bio },
      t,
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className={b()}>
        <div className={b('avatar')}>
          <UserAvatar avatarURL={avatarURL} size='big' />
        </div>
        <div className={b('fields')}>
          <div className={b('field')}>
            <TextInputField
              name={name}
              defaultValue={name}
              label={t(intl.name)}
              validate={validateName}
              t={t}
            />
          </div>
          <div className={b('field')}>
            <TextInputField
              name={nickname}
              defaultValue={nickname}
              label={t(intl.nickname)}
              validate={validateNickname}
              t={t}
            />
          </div>
          <div className={b('field')}>
            <NumberInputField name='age' defaultValue={age} label={t(intl.age)} t={t} />
          </div>
          <div className={b('field')}>
            <TextInputField
              name={bio}
              defaultValue={bio}
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
  private handleFormSubmit(values: IUserFields) {
    const { updateUser, setNotification, t } = this.props;

    updateUser(values);
    setNotification({ kind: 'info', text: t(tKeys.shared.notifications.saved) });
  }
}

const connectedComponent = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(UserEdit),
);

export { connectedComponent as UserEdit };
