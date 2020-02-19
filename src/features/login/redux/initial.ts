import { IReduxState, ICommunication } from '../namespace';

const initalCommunication: ICommunication = {
  isRequesting: false,
  error: '',
};

const initialState: IReduxState = {
  communication: {
    login: initalCommunication,
  },
};

export { initialState };
