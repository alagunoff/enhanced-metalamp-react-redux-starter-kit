import { IReduxEntry } from 'shared/types/app';

import * as namespace from './namespace';
import { actionCreators, rootReducer, getSaga } from './redux';
import { user } from './constants';

export * from './view';

const reduxEntry: IReduxEntry = {
  reducers: { user: rootReducer },
  sagas: [getSaga],
};

export { reduxEntry, namespace, actionCreators, user as defaultUser };
