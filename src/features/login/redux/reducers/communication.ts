import { makeCommunicationReducer } from 'redux-make-communication';
import { combineReducers } from 'redux';

import * as NS from '../../namespace';
import { initialState } from '../initial';

const communicationReducer = combineReducers<NS.IReduxState['communication']>({
  login: makeCommunicationReducer<NS.Login, NS.LoginSuccess, NS.LoginFail>(
    'LOGIN:LOGIN',
    'LOGIN:LOGIN_SUCCESS',
    'LOGIN:LOGIN_FAIL',
    initialState.communication.login,
  ),
  loginGoogle: makeCommunicationReducer<NS.LoginGoogle, NS.LoginGoogleSuccess, NS.LoginGoogleFail>(
    'LOGIN:LOGIN_GOOGLE',
    'LOGIN:LOGIN_GOOGLE_SUCCESS',
    'LOGIN:LOGIN_GOOGLE_FAIL',
    initialState.communication.loginGoogle,
  ),
  loginFacebook: makeCommunicationReducer<
  NS.LoginFacebook,
  NS.LoginFacebookSuccess,
  NS.LoginFacebookFail
  >(
    'LOGIN:LOGIN_FACEBOOK',
    'LOGIN:LOGIN_FACEBOOK_SUCCESS',
    'LOGIN:LOGIN_FACEBOOK_FAIL',
    initialState.communication.loginFacebook,
  ),
  logout: makeCommunicationReducer<NS.Logout, NS.LogoutSuccess, NS.LogoutFail>(
    'LOGIN:LOGOUT',
    'LOGIN:LOGOUT_SUCCESS',
    'LOGIN:LOGOUT_FAIL',
    initialState.communication.logout,
  ),
  restorePassword: makeCommunicationReducer<
  NS.RestorePassword,
  NS.RestorePasswordSuccess,
  NS.RestorePasswordFail
  >(
    'LOGIN:RESTORE_PASSWORD',
    'LOGIN:RESTORE_PASSWORD_SUCCESS',
    'LOGIN:RESTORE_PASSWORD_FAIL',
    initialState.communication.restorePassword,
  ),
  registration: makeCommunicationReducer<
  NS.Registration,
  NS.RegistrationSuccess,
  NS.RegistrationFail
  >(
    'LOGIN:REGISTRATION',
    'LOGIN:REGISTRATION_SUCCESS',
    'LOGIN:REGISTRATION_FAIL',
    initialState.communication.registration,
  ),
});

export { communicationReducer };
