import { combineReducers } from 'redux';

import { dataReducer } from './data';
import { communicationReducer } from './communication';
import * as NS from '../../namespace';

const rootReducer = combineReducers<NS.IReduxState>({
  communication: communicationReducer,
  data: dataReducer,
});

export { rootReducer };
