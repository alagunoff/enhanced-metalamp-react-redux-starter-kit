import { put, call, all, takeLatest, cancelled } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
//import firebase from 'firebase/app';
//import 'firebase/auth';

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

function* handleUserInit(firebaseUser: { user: firebase.User | null }) {
  const { user } = firebaseUser;

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
}

function* executeInitUser({ api }: IDependencies) {
  const channel = yield call(api.initUser);

  try {
    yield takeLatest(channel, handleUserInit);
    yield put(actionCreators.initUserSuccess());
  } catch (error) {
    yield put(actionCreators.initUserFail(getErrorMsg(error)));
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

function* executeLoadUser(firebaseUser: { user: firebase.User | null }) {
  const { user } = firebaseUser;

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
