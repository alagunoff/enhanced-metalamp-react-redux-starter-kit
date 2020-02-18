import { ICommunication } from 'shared/types/redux';

interface IReduxState {
  communications: {
    login: ICommunication;
    logout: ICommunication;
    restorePassword: ICommunication;
    registration: ICommunication;
  };
}

export { IReduxState };
