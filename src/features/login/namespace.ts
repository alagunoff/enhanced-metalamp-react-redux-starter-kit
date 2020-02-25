import { ICommunication, IPlainFailAction, IAction, IPlainAction } from 'shared/types/redux';

export interface IReduxState {
  communication: {
    login: ICommunication;
    registration: ICommunication;
  };
}

export type ILoginPayload = {
  email: string;
  password: string;
};

export type IRegistrationPayload = {
  email: string;
  password: string;
  refusalToSubscription: boolean;
}

export type ILogin = IAction<'LOGIN:LOGIN', ILoginPayload>;
export type ILoginSuccess = IPlainAction<'LOGIN:LOGIN_SUCCESS'>;
export type ILoginFail = IPlainFailAction<'LOGIN:LOGIN_FAIL'>;
export type ILoginAction = ILogin | ILoginSuccess | ILoginFail;
export type IRegistration = IAction<'REGISTRATION:REGISTRATION', IRegistrationPayload>;
export type IRegistrationSuccess = IPlainAction<'REGISTRATION:REGISTRATION_SUCCESS'>;
export type IRegistrationFail = IPlainFailAction<'REGISTRATION:REGISTRATION_FAIL'>;
export type IRegistrationAction = IRegistration | IRegistrationSuccess | IRegistrationFail;
