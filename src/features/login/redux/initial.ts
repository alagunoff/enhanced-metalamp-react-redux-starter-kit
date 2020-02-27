import { ICommunication } from 'shared/types/redux';

import { IReduxState } from '../namespace';

const initalCommunication: ICommunication = {
  isRequesting: false,
  error: '',
};

const initialState: IReduxState = {
  communication: {
    login: initalCommunication,
    logout: initalCommunication,
    restorePassword: initalCommunication,
    confirmRestorePassword: initalCommunication,
    registration: initalCommunication,
  },
};

export { initialState };
