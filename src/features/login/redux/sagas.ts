import { put, call, all, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { getErrorMsg } from 'shared/helpers';
import { actionCreators as userActions, defaultUser } from 'services/user';

import * as NS from '../namespace';
import * as actionCreators from './actionCreators';

function getSaga(deps: IDependencies) {
  const loginType: NS.ILogin['type'] = 'LOGIN:LOGIN';
  const loginGoogleType: NS.ILoginGoogle['type'] = 'LOGIN:LOGIN_GOOGLE';
  const loginFacebookType: NS.ILoginFacebook['type'] = 'LOGIN:LOGIN_FACEBOOK';
  const logoutType: NS.ILogout['type'] = 'LOGIN:LOGOUT';
  const restorePasswordType: NS.IRestorePassword['type'] = 'LOGIN:RESTORE_PASSWORD';
  const registrationType: NS.IRegistration['type'] = 'LOGIN:REGISTRATION';

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

function* executeLogin({ api }: IDependencies, { payload }: NS.ILogin) {
  try {
    const { email: newEmail }: firebase.User = yield call(api.login, payload);
    const { email: defaultEmail } = defaultUser;
    const email = newEmail === null ? defaultEmail : newEmail;

    yield put(actionCreators.loginSuccess());
    yield put(userActions.updateUser({ ...defaultUser, email }));
  } catch (error) {
    yield put(actionCreators.loginFail(getErrorMsg(error)));
  }
}

function* executeLoginGoogle({ api }: IDependencies) {
  try {
    const {
      displayName: newName,
      email: newEmail,
      photoURL: newAvatarURL,
    }: firebase.User = yield call(api.loginGoogle);
    const { name: defaultName, email: defaultEmail, avatarURL: defaultAvatarURL } = defaultUser;
    const name = newName === null ? defaultName : newName;
    const email = newEmail === null ? defaultEmail : newEmail;
    const avatarURL = newAvatarURL === null ? defaultAvatarURL : newAvatarURL;

    yield put(actionCreators.loginGoogleSuccess());
    yield put(userActions.updateUser({ ...defaultUser, name, email, avatarURL }));
  } catch (error) {
    yield put(actionCreators.loginGoogleFail(getErrorMsg(error)));
  }
}

function* executeLoginFacebook({ api }: IDependencies) {
  try {
    const {
      displayName: newName,
      email: newEmail,
      photoURL: newAvatarURL,
    }: firebase.User = yield call(api.loginFacebook);
    const { name: defaultName, email: defaultEmail, avatarURL: defaultAvatarURL } = defaultUser;
    const name = newName === null ? defaultName : newName;
    const email = newEmail === null ? defaultEmail : newEmail;
    const avatarURL = newAvatarURL === null ? defaultAvatarURL : newAvatarURL;

    yield put(actionCreators.loginFacebookSuccess());
    yield put(userActions.updateUser({ ...defaultUser, name, email, avatarURL }));
  } catch (error) {
    yield put(actionCreators.loginFail(getErrorMsg(error)));
  }
}

function* executeLogout({ api }: IDependencies) {
  try {
    yield call(api.logout);
    yield put(actionCreators.logoutSuccess());
    yield put(userActions.updateUser(null));
  } catch (error) {
    yield put(actionCreators.logoutFail(getErrorMsg(error)));
  }
}

function* executeRestorePassword(
  { api }: IDependencies,
  { payload: { email } }: NS.IRestorePassword,
) {
  try {
    yield call(api.restorePassword, email);
    yield put(actionCreators.restorePasswordSuccess());
  } catch (error) {
    yield put(actionCreators.restorePasswordFail(getErrorMsg(error)));
  }
}

function* executeRegistration({ api }: IDependencies, { payload }: NS.IRegistration) {
  try {
    yield call(api.registration, payload);
    yield put(actionCreators.registrationSuccess());
  } catch (error) {
    yield put(actionCreators.registrationFail(getErrorMsg(error)));
  }
}

export { getSaga };
