import { ICommunication, IPlainFailAction, IAction, IPlainAction } from 'shared/types/redux';

export interface IReduxState {
  communication: {
    login: ICommunication;
    loginGoogle: ICommunication;
    loginFacebook: ICommunication;
    logout: ICommunication;
    restorePassword: ICommunication;
    registration: ICommunication;
  };
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRestorePasswordPayload {
  email: string;
}

export interface IRegistrationPayload {
  email: string;
  password: string;
  refusalToSubscription: boolean;
}

export type Login = IAction<'LOGIN:LOGIN', ILoginPayload>;
export type LoginSuccess = IPlainAction<'LOGIN:LOGIN_SUCCESS'>;
export type LoginFail = IPlainFailAction<'LOGIN:LOGIN_FAIL'>;
export type LoginAction = Login | LoginSuccess | LoginFail;

export type LoginGoogle = IPlainAction<'LOGIN:LOGIN_GOOGLE'>;
export type LoginGoogleSuccess = IPlainAction<'LOGIN:LOGIN_GOOGLE_SUCCESS'>;
export type LoginGoogleFail = IPlainFailAction<'LOGIN:LOGIN_GOOGLE_FAIL'>;
export type LoginGoogleAction = LoginGoogle | LoginGoogleSuccess | LoginGoogleFail;

export type LoginFacebook = IPlainAction<'LOGIN:LOGIN_FACEBOOK'>;
export type LoginFacebookSuccess = IPlainAction<'LOGIN:LOGIN_FACEBOOK_SUCCESS'>;
export type LoginFacebookFail = IPlainFailAction<'LOGIN:LOGIN_FACEBOOK_FAIL'>;
export type LoginFacebookAction = LoginFacebook | LoginFacebookSuccess | LoginFacebookFail;

export type Logout = IPlainAction<'LOGIN:LOGOUT'>;
export type LogoutSuccess = IPlainAction<'LOGIN:LOGOUT_SUCCESS'>;
export type LogoutFail = IPlainFailAction<'LOGIN:LOGOUT_FAIL'>;
export type LogoutAction = Logout | LogoutSuccess | LogoutFail;

export type RestorePassword = IAction<'LOGIN:RESTORE_PASSWORD', IRestorePasswordPayload>;
export type RestorePasswordSuccess = IPlainAction<'LOGIN:RESTORE_PASSWORD_SUCCESS'>;
export type RestorePasswordFail = IPlainFailAction<'LOGIN:RESTORE_PASSWORD_FAIL'>;
export type RestorePasswordAction = RestorePassword | RestorePasswordSuccess | RestorePasswordFail;

export type Registration = IAction<'LOGIN:REGISTRATION', IRegistrationPayload>;
export type RegistrationSuccess = IPlainAction<'LOGIN:REGISTRATION_SUCCESS'>;
export type RegistrationFail = IPlainFailAction<'LOGIN:REGISTRATION_FAIL'>;
export type RegistrationAction = Registration | RegistrationSuccess | RegistrationFail;
