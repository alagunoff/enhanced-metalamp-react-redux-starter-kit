import firebase from 'firebase/app';

import { IAction } from 'shared/types/redux';

type IUser = firebase.User | null;

interface IReduxState {
  data: {
    user: IUser;
  };
}

type IUpdateUser = IAction<'USER:UPDATE_USER', IUser>;
type Action = IUpdateUser;

export { Action, IUpdateUser, IReduxState, IUser };
