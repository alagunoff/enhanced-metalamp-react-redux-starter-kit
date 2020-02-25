import { makeCommunicationReducer } from 'redux-make-communication';
import { combineReducers } from 'redux';

import * as NS from '../../namespace';
import { initialState } from '../initial';

const communicationReducer = combineReducers<NS.IReduxState['communication']>({
  login: makeCommunicationReducer<NS.ILogin, NS.ILoginSuccess, NS.ILoginFail>(
    'LOGIN:LOGIN',
    'LOGIN:LOGIN_SUCCESS',
    'LOGIN:LOGIN_FAIL',
    initialState.communication.login,
  ),
  registration: makeCommunicationReducer<
    NS.IRegistration,
    NS.IRegistrationSuccess,
    NS.IRegistrationFail
  >(
    'REGISTRATION:REGISTRATION',
    'REGISTRATION:REGISTRATION_SUCCESS',
    'REGISTRATION:REGISTRATION_FAIL',
    initialState.communication.registration,
  ),
});

export { communicationReducer };
