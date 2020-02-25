import { put, call, all, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { getErrorMsg } from 'shared/helpers';

import * as NS from '../namespace';
import * as actionCreators from './actionCreators';

function getSaga(deps: IDependencies) {
  const loginType: NS.ILogin['type'] = 'LOGIN:LOGIN';
  const registrationType: NS.IRegistration['type'] = 'REGISTRATION:REGISTRATION';

  return function* saga(): SagaIterator {
    yield all([
      takeLatest(loginType, executeLogin, deps),
      takeLatest(registrationType, executeRegistration, deps),
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

function* executeRegistration({ api }: IDependencies, { payload }: NS.IRegistration) {
  try {
    yield call(api.auth.registration, payload);
    yield put(actionCreators.registrationSuccess());
  } catch (error) {
    
  }
}

export { getSaga };
