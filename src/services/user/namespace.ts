import { ICommunication, IPlainFailAction, IAction, IPlainAction } from 'shared/types/redux';

export interface IUser {
  avatarURL: string;
  name: string;
  email: string;
  nickname?: string;
  age?: number;
  bio?: string;
}

export interface IReduxState {
  communication: {
    loadUser: ICommunication;
  };
  data: {
    user: IUser | null;
  };
}

export type UpdateUser = IAction<'USER:UPDATE_USER', IUser | null>;

export type LoadUser = IPlainAction<'USER:LOAD_USER'>;
export type LoadUserSuccess = IPlainAction<'USER:LOAD_USER_SUCCESS'>;
export type LoadUserFail = IPlainFailAction<'USER:LOAD_USER_FAIL'>;
export type LoadUserAction = LoadUser | LoadUserSuccess | LoadUserFail;
