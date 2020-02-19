import { combineReducers } from 'redux';

import { communicationReducer } from './communications';

const reducer = combineReducers({
  login: communicationReducer,
});

export { reducer };
