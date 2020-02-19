import { put, call, all, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { getErrorMsg } from 'shared/helpers';

import * as NS from '../namespace';
import * as actionCreators from './actionCreators';

function getSaga(deps: IDependencies) {
  const loginType: NS.ILogin['type'] = 'LOGIN:LOGIN';

  return function* saga(): SagaIterator {
    yield all([takeLatest(loginType, executeLogin, deps)]);
  };
}

function* executeLogin({ api }: IDependencies, { payload }: NS.ILogin) {
  try {
    const { email, password } = payload;

    //yield call(api.auth.login, email, password);
    yield put(actionCreators.loginSuccess());
  } catch (error) {
    const errorMsg = getErrorMsg(error);

    yield put(actionCreators.loginFail(errorMsg));
  }
}

export { getSaga };
