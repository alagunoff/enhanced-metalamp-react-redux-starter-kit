import { makeCommunicationReducer } from 'redux-make-communication';
import { combineReducers } from 'redux';

import * as NS from '../../namespace';
import { initial } from '../initial';

const communicationReducer = combineReducers<NS.IReduxState['communication']>({
  loadUser: makeCommunicationReducer<NS.LoadUser, NS.LoadUserSuccess, NS.LoadUserFail>(
    'USER:LOAD_USER',
    'USER:LOAD_USER_SUCCESS',
    'USER:LOAD_USER_FAIL',
    initial.communication.loadUser,
  ),
});

export { communicationReducer };
