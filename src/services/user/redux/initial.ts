import { ICommunication } from 'shared/types/redux';

import { IReduxState } from '../namespace';

const initalCommunication: ICommunication = {
  isRequesting: false,
  error: '',
};

const initial: IReduxState = {
  communication: {
    loadUser: initalCommunication,
  },
  data: {
    user: null,
  },
};

export { initial };
