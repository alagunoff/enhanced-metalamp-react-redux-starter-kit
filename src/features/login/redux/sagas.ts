import { put, call, all, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { getErrorMsg } from 'shared/helpers';

import * as NS from '../namespace';
import * as actionCreators from './actionCreators';

function getSaga(deps: IDependencies) {
  const loginType: NS.Login['type'] = 'LOGIN:LOGIN';
  const loginGoogleType: NS.LoginGoogle['type'] = 'LOGIN:LOGIN_GOOGLE';
  const loginFacebookType: NS.LoginFacebook['type'] = 'LOGIN:LOGIN_FACEBOOK';
  const logoutType: NS.Logout['type'] = 'LOGIN:LOGOUT';
  const restorePasswordType: NS.RestorePassword['type'] = 'LOGIN:RESTORE_PASSWORD';
  const registrationType: NS.Registration['type'] = 'LOGIN:REGISTRATION';

  return function* saga(): SagaIterator {
    yield all([
      takeLatest(loginType, executeLogin, deps),
      takeLatest(loginGoogleType, executeLoginGoogle, deps),
      takeLatest(loginFacebookType, executeLoginFacebook, deps),
      takeLatest(logoutType, executeLogout, deps),
      takeLatest(registrationType, executeRegistration, deps),
      takeLatest(restorePasswordType, executeRestorePassword, deps),
    ]);
  };
}

function* executeLogin({ api }: IDependencies, { payload }: NS.Login) {
  try {
    yield call(api.login, payload);
    yield put(actionCreators.loginSuccess());
  } catch (error) {
    yield put(actionCreators.loginFail(getErrorMsg(error)));
  }
}

function* executeLoginGoogle({ api }: IDependencies) {
  try {
    yield call(api.loginGoogle);
    yield put(actionCreators.loginGoogleSuccess());
  } catch (error) {
    yield put(actionCreators.loginGoogleFail(getErrorMsg(error)));
  }
}

function* executeLoginFacebook({ api }: IDependencies) {
  try {
    yield call(api.loginFacebook);
    yield put(actionCreators.loginFacebookSuccess());
  } catch (error) {
    yield put(actionCreators.loginFacebookFail(getErrorMsg(error)));
  }
}

function* executeLogout({ api }: IDependencies) {
  try {
    yield call(api.logout);
    yield put(actionCreators.logoutSuccess());
  } catch (error) {
    yield put(actionCreators.logoutFail(getErrorMsg(error)));
  }
}

function* executeRestorePassword(
  { api }: IDependencies,
  { payload: { email } }: NS.RestorePassword,
) {
  try {
    yield call(api.restorePassword, email);
    yield put(actionCreators.restorePasswordSuccess());
  } catch (error) {
    yield put(actionCreators.restorePasswordFail(getErrorMsg(error)));
  }
}

function* executeRegistration({ api }: IDependencies, { payload }: NS.Registration) {
  try {
    yield call(api.registration, payload);
    yield put(actionCreators.registrationSuccess());
  } catch (error) {
    yield put(actionCreators.registrationFail(getErrorMsg(error)));
  }
}

export { getSaga };
