import { combineReducers } from 'redux';

import { communicationReducer } from './communication';
import * as NS from '../../namespace';

const reducer = combineReducers<NS.IReduxState>({
  communication: communicationReducer,
});

export { reducer };
