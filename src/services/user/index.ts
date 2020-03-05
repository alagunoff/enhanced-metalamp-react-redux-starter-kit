import { IReduxEntry } from 'shared/types/app';

import * as namespace from './namespace';
import { actionCreators, reducer } from './redux';
import { user } from './constants';

export * from './view';

const reduxEntry: IReduxEntry = {
  reducers: { user: reducer },
};

export { reduxEntry, namespace, actionCreators, user as defaultUser };
