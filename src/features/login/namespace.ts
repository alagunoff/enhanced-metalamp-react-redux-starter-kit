import { ICommunication, IPlainFailAction, IAction, IPlainAction } from 'shared/types/redux';

export interface IReduxState {
  communication: {
    login: ICommunication;
    logout: ICommunication;
    restorePassword: ICommunication;
    registration: ICommunication;
  };
}

export type ILoginPayload = {
  email: string;
  password: string;
};

export type IRestorePasswordPayload = {
  email: string;
};

export type IRegistrationPayload = {
  email: string;
  password: string;
  refusalToSubscription: boolean;
};

export type ILogin = IAction<'LOGIN:LOGIN', ILoginPayload>;
export type ILoginSuccess = IPlainAction<'LOGIN:LOGIN_SUCCESS'>;
export type ILoginFail = IPlainFailAction<'LOGIN:LOGIN_FAIL'>;
export type ILoginAction = ILogin | ILoginSuccess | ILoginFail;

export type ILogout = IPlainAction<'LOGIN:LOGOUT'>;
export type ILogoutSuccess = IPlainAction<'LOGIN:LOGOUT_SUCCESS'>;
export type ILogoutFail = IPlainFailAction<'LOGIN:LOGOUT_FAIL'>;
export type ILogoutAction = ILogout | ILogoutSuccess | ILogoutFail;

export type IRestorePassword = IAction<'LOGIN:RESTORE_PASSWORD', IRestorePasswordPayload>;
export type IRestorePasswordSuccess = IPlainAction<'LOGIN:RESTORE_PASSWORD_SUCCESS'>;
export type IRestorePasswordFail = IPlainFailAction<'LOGIN:RESTORE_PASSWORD_FAIL'>;
export type IRestorePasswordAction =
  | IRestorePassword
  | IRestorePasswordSuccess
  | IRestorePasswordFail;

export type IRegistration = IAction<'LOGIN:REGISTRATION', IRegistrationPayload>;
export type IRegistrationSuccess = IPlainAction<'LOGIN:REGISTRATION_SUCCESS'>;
export type IRegistrationFail = IPlainFailAction<'LOGIN:REGISTRATION_FAIL'>;
export type IRegistrationAction = IRegistration | IRegistrationSuccess | IRegistrationFail;
