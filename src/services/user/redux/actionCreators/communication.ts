import { makeCommunicationActionCreators } from 'redux-make-communication';

import * as NS from '../../namespace';

const {
  execute: loadUser,
  completed: loadUserSuccess,
  failed: loadUserFail,
} = makeCommunicationActionCreators<NS.LoadUser, NS.LoadUserSuccess, NS.LoadUserFail>(
  'USER:LOAD_USER',
  'USER:LOAD_USER_SUCCESS',
  'USER:LOAD_USER_FAIL',
);

export { loadUser, loadUserSuccess, loadUserFail };
