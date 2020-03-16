import { ICommunication } from 'shared/types/redux';

import { IReduxState } from '../namespace';

const initialCommunication: ICommunication = {
  isRequesting: false,
  error: '',
};

const initialState: IReduxState = {
  communication: {
    login: initialCommunication,
    loginGoogle: initialCommunication,
    loginFacebook: initialCommunication,
    logout: initialCommunication,
    restorePassword: initialCommunication,
    registration: initialCommunication,
  },
};

export { initialState };
