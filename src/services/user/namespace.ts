import { IAction } from 'shared/types/redux';

interface IUser {
  avatarURL: string;
  name: string;
  email: string;
  nickname: string;
  age: number;
  bio: string;
}

interface IReduxState {
  data: {
    user: IUser | null;
  };
}

type IUpdateUser = IAction<'USER:UPDATE_USER', IUser | null>;
type IUserAction = IUpdateUser;

export { IUserAction, IUpdateUser, IReduxState, IUser };
