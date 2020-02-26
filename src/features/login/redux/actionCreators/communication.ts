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
  execute: restorePassword,
  completed: restorePasswordSuccess,
  failed: restorePasswordFail,
} = makeCommunicationActionCreators<
  NS.IRestorePassword,
  NS.IRestorePasswordSuccess,
  NS.IRestorePasswordFail
>(
  'RESTORE_PASSWORD:RESTORE_PASSWORD',
  'RESTORE_PASSWORD:RESTORE_PASSWORD_SUCCESS',
  'RESTORE_PASSWORD:RESTORE_PASSWORD_FAIL',
);

export const {
  execute: confirmRestorePassword,
  completed: confirmRestorePasswordSuccess,
  failed: confirmRestorePasswordFail,
} = makeCommunicationActionCreators<
  NS.IConfirmRestorePassword,
  NS.IConfirmRestorePasswordSuccess,
  NS.IConfirmRestorePasswordFail
>(
  'CONFIRM_RESTORE_PASSWORD:CONFIRM_RESTORE_PASSWORD',
  'CONFIRM_RESTORE_PASSWORD:CONFIRM_RESTORE_PASSWORD_SUCCESS',
  'CONFIRM_RESTORE_PASSWORD:CONFIRM_RESTORE_PASSWORD_FAIL',
);

export const {
  execute: registration,
  completed: registrationSuccess,
  failed: registrationFail,
} = makeCommunicationActionCreators<
  NS.IRegistration,
  NS.IRegistrationSuccess,
  NS.IRegistrationFail
>(
  'REGISTRATION:REGISTRATION',
  'REGISTRATION:REGISTRATION_SUCCESS',
  'REGISTRATION:REGISTRATION_FAIL',
);
