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
  loginGoogle: makeCommunicationReducer<
    NS.ILoginGoogle,
    NS.ILoginGoogleSuccess,
    NS.ILoginGoogleFail
  >(
    'LOGIN:LOGIN_GOOGLE',
    'LOGIN:LOGIN_GOOGLE_SUCCESS',
    'LOGIN:LOGIN_GOOGLE_FAIL',
    initialState.communication.loginGoogle,
  ),
  loginFacebook: makeCommunicationReducer<
    NS.ILoginFacebook,
    NS.ILoginFacebookSuccess,
    NS.ILoginFacebookFail
  >(
    'LOGIN:LOGIN_FACEBOOK',
    'LOGIN:LOGIN_FACEBOOK_SUCCESS',
    'LOGIN:LOGIN_FACEBOOK_FAIL',
    initialState.communication.loginFacebook,
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
    'LOGIN:RESTORE_PASSWORD',
    'LOGIN:RESTORE_PASSWORD_SUCCESS',
    'LOGIN:RESTORE_PASSWORD_FAIL',
    initialState.communication.restorePassword,
  ),
  registration: makeCommunicationReducer<
    NS.IRegistration,
    NS.IRegistrationSuccess,
    NS.IRegistrationFail
  >(
    'LOGIN:REGISTRATION',
    'LOGIN:REGISTRATION_SUCCESS',
    'LOGIN:REGISTRATION_FAIL',
    initialState.communication.registration,
  ),
});

export { communicationReducer };
