import { combineReducers } from 'redux';

import { loginReducer } from './login';
import * as NS from '../../namespace';

export const reducer = combineReducers<NS.IReduxState>({
  login: loginReducer,
});
