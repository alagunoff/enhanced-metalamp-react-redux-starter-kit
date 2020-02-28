import { IReduxEntry } from 'shared/types/app';

import * as namespace from './namespace';
import { actionCreators, reducer } from './redux';

const reduxEntry: IReduxEntry = {
  reducers: { user: reducer },
};

export { reduxEntry, namespace, actionCreators };
