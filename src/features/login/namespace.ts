import { ICommunication, IPlainFailAction, IAction, IPlainAction } from 'shared/types/redux';

export interface IReduxState {
  communication: {
    login: ICommunication;
    logout: ICommunication;
    restorePassword: ICommunication;
    confirmRestorePassword: ICommunication;
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

export type IConfirmRestorePasswordPayload = {
  password: string;
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

export type ILogout = IPlainAction<'LOGOUT:LOGOUT'>;
export type ILogoutSuccess = IPlainAction<'LOGOUT:LOGOUT_SUCCESS'>;
export type ILogoutFail = IPlainFailAction<'LOGOUT:LOGOUT_FAIL'>;
export type ILogoutAction = ILogout | ILogoutSuccess | ILogoutFail;

export type IRestorePassword = IAction<
  'RESTORE_PASSWORD:RESTORE_PASSWORD',
  IRestorePasswordPayload
>;
export type IRestorePasswordSuccess = IPlainAction<'RESTORE_PASSWORD:RESTORE_PASSWORD_SUCCESS'>;
export type IRestorePasswordFail = IPlainFailAction<'RESTORE_PASSWORD:RESTORE_PASSWORD_FAIL'>;
export type IRestorePasswordAction =
  | IRestorePassword
  | IRestorePasswordSuccess
  | IRestorePasswordFail;

export type IConfirmRestorePassword = IAction<
  'CONFIRM_RESTORE_PASSWORD:CONFIRM_RESTORE_PASSWORD',
  IConfirmRestorePasswordPayload
>;
export type IConfirmRestorePasswordSuccess = IPlainAction<
  'CONFIRM_RESTORE_PASSWORD:CONFIRM_RESTORE_PASSWORD_SUCCESS'
>;
export type IConfirmRestorePasswordFail = IPlainFailAction<
  'CONFIRM_RESTORE_PASSWORD:CONFIRM_RESTORE_PASSWORD_FAIL'
>;
export type IConfirmRestorePasswordAction =
  | IConfirmRestorePassword
  | IConfirmRestorePasswordSuccess
  | IConfirmRestorePasswordFail;

export type IRegistration = IAction<'REGISTRATION:REGISTRATION', IRegistrationPayload>;
export type IRegistrationSuccess = IPlainAction<'REGISTRATION:REGISTRATION_SUCCESS'>;
export type IRegistrationFail = IPlainFailAction<'REGISTRATION:REGISTRATION_FAIL'>;
export type IRegistrationAction = IRegistration | IRegistrationSuccess | IRegistrationFail;
