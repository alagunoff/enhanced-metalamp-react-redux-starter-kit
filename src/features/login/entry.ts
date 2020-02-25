import { makeFeatureEntry } from 'shared/helpers/makeFeatureEntry';

import * as containers from './view/containers';
import { actionCreators, reducer, getSaga } from './redux';

const entry = makeFeatureEntry({
  containers,
  actionCreators,
  reduxEntry: {
    reducers: { login: reducer },
    sagas: [getSaga],
  },
});

type Entry = typeof entry;

export { Entry, entry };
