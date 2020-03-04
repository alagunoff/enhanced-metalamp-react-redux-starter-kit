import React, { createRef } from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { actionCreators as userActions } from 'features/login/redux';
import { IAppReduxState } from 'shared/types/app';
import { IProfile } from 'shared/types/models';
import { ICommunication } from 'shared/types/redux';
import { Popover } from 'shared/view/components';
import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';

import { ProfileAvatar } from '../../components';
import { selectors } from '../../../redux';

import './ProfilePreview.scss';

interface IState {
  isOpen: boolean;
}

interface IOwnProps {
  onEditClick(): void;
  onSuccessfulLogout: () => void;
}

interface IStateProps {
  profile: IProfile;
  logoutCommunication: ICommunication;
}
type IActionProps = typeof mapDispatchToProps;

type IProps = IStateProps & IActionProps & IOwnProps & ITranslationProps;

const b = block('profile-preview');
const { profile: intl } = tKeys.features;

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    profile: selectors.selectProfile(state),
    logoutCommunication: state.login.communication.logout,
  };
}

const mapDispatchToProps = {
  logout: userActions.logout,
};

class ProfilePreviewComponent extends React.PureComponent<IProps, IState> {
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
      profile: { avatarURL, name, nickname, age, bio },
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
          <ProfileAvatar avatarURL={avatarURL} size='small' />
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
  private handleLogoutLinkClick() {
    const { logout } = this.props;

    logout();
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

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(ProfilePreviewComponent);
const ProfilePreview = withTranslation()(connectedComponent);

export { ProfilePreview, ProfilePreviewComponent, IProps as IProfilePreviewProps };
