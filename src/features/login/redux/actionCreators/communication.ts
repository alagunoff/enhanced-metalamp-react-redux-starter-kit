import { makeCommunicationActionCreators } from 'redux-make-communication';

import * as NS from '../../namespace';

export const {
  execute: login,
  completed: loginSuccess,
  failed: loginFail,
} = makeCommunicationActionCreators<NS.Login, NS.LoginSuccess, NS.LoginFail>(
  'LOGIN:LOGIN',
  'LOGIN:LOGIN_SUCCESS',
  'LOGIN:LOGIN_FAIL',
);

export const {
  execute: loginGoogle,
  completed: loginGoogleSuccess,
  failed: loginGoogleFail,
} = makeCommunicationActionCreators<NS.LoginGoogle, NS.LoginGoogleSuccess, NS.LoginGoogleFail>(
  'LOGIN:LOGIN_GOOGLE',
  'LOGIN:LOGIN_GOOGLE_SUCCESS',
  'LOGIN:LOGIN_GOOGLE_FAIL',
);

export const {
  execute: loginFacebook,
  completed: loginFacebookSuccess,
  failed: loginFacebookFail,
} = makeCommunicationActionCreators<
NS.LoginFacebook,
NS.LoginFacebookSuccess,
NS.LoginFacebookFail
>('LOGIN:LOGIN_FACEBOOK', 'LOGIN:LOGIN_FACEBOOK_SUCCESS', 'LOGIN:LOGIN_FACEBOOK_FAIL');

export const {
  execute: logout,
  completed: logoutSuccess,
  failed: logoutFail,
} = makeCommunicationActionCreators<NS.Logout, NS.LogoutSuccess, NS.LogoutFail>(
  'LOGIN:LOGOUT',
  'LOGIN:LOGOUT_SUCCESS',
  'LOGIN:LOGOUT_FAIL',
);

export const {
  execute: restorePassword,
  completed: restorePasswordSuccess,
  failed: restorePasswordFail,
} = makeCommunicationActionCreators<
NS.RestorePassword,
NS.RestorePasswordSuccess,
NS.RestorePasswordFail
>('LOGIN:RESTORE_PASSWORD', 'LOGIN:RESTORE_PASSWORD_SUCCESS', 'LOGIN:RESTORE_PASSWORD_FAIL');

export const {
  execute: registration,
  completed: registrationSuccess,
  failed: registrationFail,
} = makeCommunicationActionCreators<NS.Registration, NS.RegistrationSuccess, NS.RegistrationFail>(
  'LOGIN:REGISTRATION',
  'LOGIN:REGISTRATION_SUCCESS',
  'LOGIN:REGISTRATION_FAIL',
);
