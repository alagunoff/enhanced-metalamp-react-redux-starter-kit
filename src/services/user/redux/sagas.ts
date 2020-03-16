import { put, call, all, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { getErrorMsg } from 'shared/helpers';

import * as NS from '../namespace';
import { user as defaultUser } from '../constants';
import * as actionCreators from './actionCreators';

function getSaga(deps: IDependencies) {
  const initUserType: NS.IInitUser['type'] = 'USER:INIT_USER';
  const loadUserType: NS.ILoadUser['type'] = 'USER:LOAD_USER';

  return function* saga(): SagaIterator {
    yield all([takeLatest(initUserType, executeInitUser, deps)]);
    yield all([takeLatest(loadUserType, executeLoadUser, deps)]);
  };
}

function* executeInitUser({ api }: IDependencies, { payload }: NS.IInitUser) {
  try {
    yield call(api.initUser, payload);
    yield put(actionCreators.initUserSuccess());
  } catch (error) {
    yield put(actionCreators.initUserFail(getErrorMsg(error)));
  }
}

function* executeLoadUser({ api }: IDependencies) {
  try {
    const user: firebase.User | null = yield call(api.loadUser);

    if (user !== null) {
      const { displayName: newName, email: newEmail, photoURL: newAvatarURL } = user;
      const { name: defaultName, email: defaultEmail, avatarURL: defaultAvatarURL } = defaultUser;
      const name = newName === null ? defaultName : newName;
      const email = newEmail === null ? defaultEmail : newEmail;
      const avatarURL = newAvatarURL === null ? defaultAvatarURL : newAvatarURL;

      yield put(actionCreators.updateUser({ ...defaultUser, name, email, avatarURL }));
    } else {
      yield put(actionCreators.updateUser(null));
    }

    yield put(actionCreators.loadUserSuccess());
  } catch (error) {
    yield put(actionCreators.loadUserFail(getErrorMsg(error)));
  }
}

export { getSaga };
