import { ICommunication, IPlainFailAction, IAction, IPlainAction } from 'shared/types/redux';

interface IReduxState {
  communication: {
    login: ICommunication;
  };
}

export type ILoginPayload = {
  email: string;
  password: string;
};

export type ILogin = IAction<'LOGIN:LOGIN', ILoginPayload>;
export type ILoginSuccess = IPlainAction<'LOGIN:LOGIN_SUCCESS'>;
export type ILoginFail = IPlainFailAction<'LOGIN:LOGIN_FAIL'>;
export type ILoginAction = ILogin | ILoginSuccess | ILoginFail;

export { IReduxState, ICommunication };
