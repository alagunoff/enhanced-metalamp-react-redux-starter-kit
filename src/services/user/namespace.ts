import { IAction } from 'shared/types/redux';

interface IUserFields {
  avatarURL: string;
  name: string;
  email: string;
  nickname: string;
  age: number;
  bio: string;
}

interface IReduxState {
  data: {
    user: IUserType;
  };
}

type IUserType = IUserFields | null;
type IUpdateUser = IAction<'USER:UPDATE_USER', IUserType>;
type IUser = IUpdateUser;

export { IUser, IUpdateUser, IReduxState, IUserFields, IUserType };
