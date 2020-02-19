import { makeCommunicationReducer } from 'redux-make-communication';
import { combineReducers } from 'redux';

import * as NS from '../../namespace';
import { initialState } from '../initial';

/* eslint max-len: 0 */
export const communicationReducer = combineReducers<NS.IReduxState['communications']>({
  login: makeCommunicationReducer<NS.ILogin, NS.ILoginSuccess, NS.ILoginFail>(
    'LOGIN:LOGIN',
    'LOGIN:LOGIN_SUCCESS',
    'LOGIN:LOGIN_FAIL',
    initialState.communications.login,
  ),
});
