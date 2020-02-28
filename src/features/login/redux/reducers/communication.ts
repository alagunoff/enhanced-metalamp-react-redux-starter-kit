import { makeCommunicationReducer } from 'redux-make-communication';
import { combineReducers } from 'redux';

import * as NS from '../../namespace';
import { initialState } from '../initial';

const communicationReducer = combineReducers<NS.IReduxState['communication']>({
  login: makeCommunicationReducer<NS.ILogin, NS.ILoginSuccess, NS.ILoginFail>(
    'LOGIN:LOGIN',
    'LOGIN:LOGIN_SUCCESS',
    'LOGIN:LOGIN_FAIL',
    initialState.communication.login,
  ),
  logout: makeCommunicationReducer<NS.ILogout, NS.ILogoutSuccess, NS.ILogoutFail>(
    'LOGIN:LOGOUT',
    'LOGIN:LOGOUT_SUCCESS',
    'LOGIN:LOGOUT_FAIL',
    initialState.communication.logout,
  ),
  restorePassword: makeCommunicationReducer<
    NS.IRestorePassword,
    NS.IRestorePasswordSuccess,
    NS.IRestorePasswordFail
  >(
    'RESTORE_PASSWORD:RESTORE_PASSWORD',
    'RESTORE_PASSWORD:RESTORE_PASSWORD_SUCCESS',
    'RESTORE_PASSWORD:RESTORE_PASSWORD_FAIL',
    initialState.communication.restorePassword,
  ),
  confirmRestorePassword: makeCommunicationReducer<
    NS.IConfirmRestorePassword,
    NS.IConfirmRestorePasswordSuccess,
    NS.IConfirmRestorePasswordFail
  >(
    'CONFIRM_RESTORE_PASSWORD:CONFIRM_RESTORE_PASSWORD',
    'CONFIRM_RESTORE_PASSWORD:CONFIRM_RESTORE_PASSWORD_SUCCESS',
    'CONFIRM_RESTORE_PASSWORD:CONFIRM_RESTORE_PASSWORD_FAIL',
    initialState.communication.confirmRestorePassword,
  ),
  registration: makeCommunicationReducer<
    NS.IRegistration,
    NS.IRegistrationSuccess,
    NS.IRegistrationFail
  >(
    'REGISTRATION:REGISTRATION',
    'REGISTRATION:REGISTRATION_SUCCESS',
    'REGISTRATION:REGISTRATION_FAIL',
    initialState.communication.registration,
  ),
});

export { communicationReducer };
