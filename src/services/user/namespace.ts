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
    initUser: ICommunication;
    loadUser: ICommunication;
  };
  data: {
    user: IUser | null;
  };
}

export type IInitUserPayload = {
  loadUser: () => void;
}

export type IUpdateUser = IAction<'USER:UPDATE_USER', IUser | null>;

export type IInitUser = IAction<'USER:INIT_USER', IInitUserPayload>;
export type IInitUserSuccess = IPlainAction<'USER:INIT_USER_SUCCESS'>;
export type IInitUserFail = IPlainFailAction<'USER:INIT_USER_FAIL'>;
export type IInitUserAction = IInitUser | IInitUserSuccess | IInitUserFail;

export type ILoadUser = IPlainAction<'USER:LOAD_USER'>;
export type ILoadUserSuccess = IPlainAction<'USER:LOAD_USER_SUCCESS'>;
export type ILoadUserFail = IPlainFailAction<'USER:LOAD_USER_FAIL'>;
export type ILoadUserAction = ILoadUser | ILoadUserSuccess | ILoadUserFail;
