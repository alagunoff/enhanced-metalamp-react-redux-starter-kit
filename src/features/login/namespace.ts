import { ICommunication, IPlainFailAction, IAction, IPlainAction } from 'shared/types/redux';

interface IReduxState {
  communication: {
    login: ICommunication;
  };
}

type ILoginPayload = {
  email: string;
  password: string;
};

type ILogin = IAction<'LOGIN:LOGIN', ILoginPayload>;
type ILoginSuccess = IPlainAction<'LOGIN:LOGIN_SUCCESS'>;
type ILoginFail = IPlainFailAction<'LOGIN:LOGIN_FAIL'>;
type ILoginAction = ILogin | ILoginSuccess | ILoginFail;

export {
  IReduxState,
  ICommunication,
  ILoginPayload,
  ILogin,
  ILoginSuccess,
  ILoginFail,
  ILoginAction,
};
