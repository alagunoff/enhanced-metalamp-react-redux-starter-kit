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
