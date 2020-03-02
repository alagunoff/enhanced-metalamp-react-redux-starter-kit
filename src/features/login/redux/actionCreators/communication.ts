import { makeCommunicationActionCreators } from 'redux-make-communication';

import * as NS from '../../namespace';

export const {
  execute: login,
  completed: loginSuccess,
  failed: loginFail,
} = makeCommunicationActionCreators<NS.ILogin, NS.ILoginSuccess, NS.ILoginFail>(
  'LOGIN:LOGIN',
  'LOGIN:LOGIN_SUCCESS',
  'LOGIN:LOGIN_FAIL',
);

export const {
  execute: logout,
  completed: logoutSuccess,
  failed: logoutFail,
} = makeCommunicationActionCreators<NS.ILogout, NS.ILogoutSuccess, NS.ILogoutFail>(
  'LOGIN:LOGOUT',
  'LOGIN:LOGOUT_SUCCESS',
  'LOGIN:LOGOUT_FAIL',
);

export const {
  execute: restorePassword,
  completed: restorePasswordSuccess,
  failed: restorePasswordFail,
} = makeCommunicationActionCreators<
  NS.IRestorePassword,
  NS.IRestorePasswordSuccess,
  NS.IRestorePasswordFail
>('LOGIN:RESTORE_PASSWORD', 'LOGIN:RESTORE_PASSWORD_SUCCESS', 'LOGIN:RESTORE_PASSWORD_FAIL');

export const {
  execute: registration,
  completed: registrationSuccess,
  failed: registrationFail,
} = makeCommunicationActionCreators<
  NS.IRegistration,
  NS.IRegistrationSuccess,
  NS.IRegistrationFail
>('LOGIN:REGISTRATION', 'LOGIN:REGISTRATION_SUCCESS', 'LOGIN:REGISTRATION_FAIL');
