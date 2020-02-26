import { put, call, all, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { getErrorMsg } from 'shared/helpers';

import * as NS from '../namespace';
import * as actionCreators from './actionCreators';

function getSaga(deps: IDependencies) {
  const loginType: NS.ILogin['type'] = 'LOGIN:LOGIN';
  const restorePasswordType: NS.IRestorePassword['type'] = 'RESTORE_PASSWORD:RESTORE_PASSWORD';
  const registrationType: NS.IRegistration['type'] = 'REGISTRATION:REGISTRATION';

  return function* saga(): SagaIterator {
    yield all([
      takeLatest(loginType, executeLogin, deps),
      takeLatest(registrationType, executeRegistration, deps),
      takeLatest(restorePasswordType, executeRestorePassword, deps),
    ]);
  };
}

function* executeLogin({ api }: IDependencies, { payload }: NS.ILogin) {
  try {
    yield call(api.auth.login, payload);
    yield put(actionCreators.loginSuccess());
  } catch (error) {
    yield put(actionCreators.loginFail(getErrorMsg(error)));
  }
}

function* executeRestorePassword(
  { api }: IDependencies,
  { payload: { email } }: NS.IRestorePassword,
) {
  try {
    yield call(api.auth.restorePassword, email);
    yield put(actionCreators.restorePasswordSuccess());
  } catch (error) {
    yield put(actionCreators.restorePasswordFail(getErrorMsg(error)));
  }
}

function* executeRegistration({ api }: IDependencies, { payload }: NS.IRegistration) {
  try {
    yield call(api.auth.registration, payload);
    yield put(actionCreators.registrationSuccess());
  } catch (error) {
    yield put(actionCreators.registrationFail(getErrorMsg(error)));
  }
}

export { getSaga };
