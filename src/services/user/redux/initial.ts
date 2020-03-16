import { ICommunication } from 'shared/types/redux';

import { IReduxState } from '../namespace';

const initialInitUserCommunication: ICommunication = {
  isRequesting: false,
  error: '',
};

const initialLoadUserCommunication: ICommunication = {
  isRequesting: true,
  error: '',
};

const initial: IReduxState = {
  communication: {
    initUser: initialInitUserCommunication,
    loadUser: initialLoadUserCommunication,
  },
  data: {
    user: null,
  },
};

export { initial };
