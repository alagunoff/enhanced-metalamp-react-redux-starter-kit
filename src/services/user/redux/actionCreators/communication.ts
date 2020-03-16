import { makeCommunicationActionCreators } from 'redux-make-communication';

import * as NS from '../../namespace';

export const {
  execute: loadUser,
  completed: loadUserSuccess,
  failed: loadUserFail,
} = makeCommunicationActionCreators<NS.ILoadUser, NS.ILoadUserSuccess, NS.ILoadUserFail>(
  'USER:LOAD_USER',
  'USER:LOAD_USER_SUCCESS',
  'USER:LOAD_USER_FAIL',
);

export const {
  execute: initUser,
  completed: initUserSuccess,
  failed: initUserFail,
} = makeCommunicationActionCreators<NS.IInitUser, NS.IInitUserSuccess, NS.IInitUserFail>(
  'USER:INIT_USER',
  'USER:INIT_USER_SUCCESS',
  'USER:INIT_USER_FAIL',
);
