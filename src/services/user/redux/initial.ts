import { ICommunication } from 'shared/types/redux';

import { IReduxState } from '../namespace';

const initialCommunication: ICommunication = {
  isRequesting: true,
  error: '',
};

const initial: IReduxState = {
  communication: {
    loadUser: initialCommunication,
  },
  data: {
    user: null,
  },
};

export { initial };
