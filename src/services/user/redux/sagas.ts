import { put, call, all, takeLatest, take, cancelled } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { getErrorMsg } from 'shared/helpers';

import * as NS from '../namespace';
import { user as defaultUser } from '../constants';
import * as actionCreators from './actionCreators';

function getSaga(deps: IDependencies) {
  const loadUserType: NS.ILoadUser['type'] = 'USER:LOAD_USER';

  return function* saga(): SagaIterator {
    yield all([takeLatest(loadUserType, executeLoadUser, deps)]);
  };
}

function* executeLoadUser({ api }: IDependencies) {
  const channel = yield call(api.loadUser);

  try {
    while (true) {
      const user = yield take(channel);
      yield call(updateUser, user);
      yield put(actionCreators.loadUserSuccess());
    }
  } catch (error) {
    yield put(actionCreators.loadUserFail(getErrorMsg(error)));
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

function* updateUser({ user }: { user: firebase.User | null }) {
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

export { getSaga };
