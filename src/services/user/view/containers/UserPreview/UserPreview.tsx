import React, { createRef } from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { actionCreators as loginActions } from 'features/login/redux';
import { IAppReduxState } from 'shared/types/app';
import { ICommunication } from 'shared/types/redux';
import { Popover } from 'shared/view/components';
import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';
import { namespace as UserNamespace } from 'services/user';

import { UserAvatar } from '../../components';

import './UserPreview.scss';

interface IState {
  isOpen: boolean;
}

interface IOwnProps {
  onEditClick(): void;
  onSuccessfulLogout: () => void;
}

interface IStateProps {
  user: UserNamespace.IUser | null;
  logoutCommunication: ICommunication;
}
type IActionProps = typeof mapDispatchToProps;

type IProps = IStateProps & IActionProps & IOwnProps & ITranslationProps;

const b = block('user-preview');
const { user: intl } = tKeys.services;

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    user: state.user.data.user,
    logoutCommunication: state.login.communication.logout,
  };
}

const mapDispatchToProps = {
  logout: loginActions.logout,
};

class UserPreview extends React.PureComponent<IProps, IState> {
  public state: IState = {
    isOpen: false,
  };

  private blockRef = createRef<HTMLDivElement>();

  public componentDidUpdate(prevProps: IProps) {
    const { onSuccessfulLogout } = this.props;

    if (this.isSuccessfulLogout(prevProps)) {
      onSuccessfulLogout();
    }
  }

  public render() {
    const {
      user: { avatarURL, name, nickname, age, bio },
      onEditClick,
      t,
    } = this.props;
    const { isOpen } = this.state;

    return (
      <div className={b()} ref={this.blockRef}>
        <div
          tabIndex={0}
          role='button img'
          className={b('avatar')}
          onClick={this.handleAvatarClick}
          onKeyPress={this.handleAvatarKeyPress}
        >
          <UserAvatar avatarURL={avatarURL} size='small' />
        </div>
        <Popover
          open={isOpen}
          onClose={this.handlePopoverClose}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          anchorEl={this.blockRef.current}
        >
          <div className={b('info')}>
            <div className={b('main-info')}>
              <div className={b('name')}>{name}</div>
              <div className={b('nickname-age')}>
                <div className={b('nickname')}>{nickname}</div>
                <div className={b('age')}>{t(intl.yearsOld, { count: age })}</div>
              </div>
            </div>
            <div className={b('bio')}>{bio}</div>
            <div className={b('buttons')}>
              <span
                className={b('edit')}
                tabIndex={0}
                role='button'
                onClick={onEditClick}
                onKeyPress={this.handleEditButtonKeyPress}
              >
                {t(intl.edit)}
              </span>
              <button
                type='button'
                className={b('logout-link')}
                onClick={this.handleLogoutLinkClick}
              >
                {t(intl.logout)}
              </button>
            </div>
          </div>
        </Popover>
      </div>
    );
  }

  @autobind
  private handlePopoverClose() {
    this.setState({ isOpen: false });
  }

  @autobind
  private handleEditButtonKeyPress(e: React.KeyboardEvent<HTMLDivElement>) {
    const { onEditClick } = this.props;

    if (e.key === 'Enter') {
      onEditClick();
    }
  }

  @autobind
  private handleAvatarClick() {
    this.setState({ isOpen: true });
  }

  @autobind
  private handleAvatarKeyPress(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') {
      this.setState({ isOpen: true });
    }
  }

  @autobind
  private handleLogoutLinkClick() {
    const { logout } = this.props;

    logout();
  }

  @autobind
  private isSuccessfulLogout(prevProps: IProps) {
    const {
      logoutCommunication: { isRequesting, error },
    } = this.props;
    const {
      logoutCommunication: { isRequesting: isPrevRequesting },
    } = prevProps;

    return error === '' && !isRequesting && isPrevRequesting;
  }
}

const connectedComponent = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(UserPreview),
);

export { connectedComponent as UserPreview };
