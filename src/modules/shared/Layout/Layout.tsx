import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { autobind } from 'core-decorators';

import { IAppReduxState } from 'shared/types/app';
import { actionCreators } from 'features/login/redux';
import { LanguageSelector, withTranslation, ITranslationProps, tKeys } from 'services/i18n';
import { memoizeByProps } from 'shared/helpers';
import { namespace as UserNamespace } from 'services/user';
import { withAsyncFeatures } from 'core';
import * as features from 'features';

import { routes } from '../../routes';
import { LayoutHeaderMenu, IHeaderMenuItem } from './LayoutHeaderMenu/LayoutHeaderMenu';

import './Layout.scss';

type IStateProps = {
  user: UserNamespace.IUser;
};
type IOwnProps = {
  title: string;
};
type IFeatureProps = {
  profileFeatureEntry: features.profile.Entry;
};

type IActionProps = typeof mapDispatchToProps;
type IProps = IOwnProps &
  IStateProps &
  IActionProps &
  IFeatureProps &
  RouteComponentProps &
  ITranslationProps;

function mapStateToProps(state: IAppReduxState): IStateProps {
  return {
    user: state.user.data.user,
  };
}

const mapDispatchToProps = {
  logout: actionCreators.logout,
};

const b = block('layout');
const { header, footer } = tKeys.shared;

class LayoutComponent extends React.Component<IProps> {
  public render() {
    const {
      children,
      title,
      profileFeatureEntry: { containers },
      location,
      t,
      user,
    } = this.props;
    const { ProfilePreview } = containers;

    return (
      <div className={b()}>
        <header className={b('header')}>
          <div className={b('header-content')}>
            <div className={b('left-menu')}>
              <LayoutHeaderMenu
                menuItems={this.getMenuItems()}
                activeItemPath={location.pathname}
              />
            </div>
            <div className={b('right-menu')}>
              {user ? (
                <ProfilePreview
                  onEditClick={this.handleEditProfileClick}
                  onLogoutLinkClick={this.handleLogoutLinkClick}
                />
              ) : (
                <div className={b('buttons')}>
                  <button
                    className={b('login-link')}
                    type='button'
                    onClick={this.handleLoginLinkClick}
                  >
                    {t(header.login)}
                  </button>
                  {' / '}
                  <button
                    className={b('registration-link')}
                    type='button'
                    onClick={this.handleRegistrationLinkClick}
                  >
                    {t(header.registration)}
                  </button>
                </div>
              )}

              <div className={b('language-selector')}>
                <LanguageSelector />
              </div>
            </div>
          </div>
        </header>
        <div className={b('content')}>
          <h1 className={b('title')}>{title}</h1>
          {children}
        </div>
        <footer className={b('footer')}>
          <div className={b('footer-content')}>
            <a
              className={b('company-link')}
              href='https://fullstack-development.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              {t(footer.fsd)}
            </a>
          </div>
        </footer>
      </div>
    );
  }

  @memoizeByProps((props: IProps) => [props.t])
  private getMenuItems(): IHeaderMenuItem[] {
    const { t } = this.props;
    return [
      {
        path: routes.search.users.getRoutePath(),
        title: t(header.users),
      },
      {
        path: routes.search.repositories.getRoutePath(),
        title: t(header.repositories),
      },
    ];
  }

  @autobind
  private handleLoginLinkClick() {
    const { history } = this.props;

    history.push(routes.auth.login.getRedirectPath());
  }

  @autobind
  private handleRegistrationLinkClick() {
    const { history } = this.props;

    history.push(routes.auth.registration.getRedirectPath());
  }

  @autobind
  private handleLogoutLinkClick() {
    const { logout } = this.props;

    logout();
  }

  @autobind
  private handleEditProfileClick() {
    const { history } = this.props;

    history.push(routes.profile.getRoutePath());
  }
}

const wrappedComponent = withTranslation()(withRouter(LayoutComponent));
const Layout = withAsyncFeatures({
  profileFeatureEntry: features.profile.loadEntry,
})(connect(mapStateToProps, mapDispatchToProps)(wrappedComponent));

export { Layout, LayoutComponent, IProps as ILayoutProps };
