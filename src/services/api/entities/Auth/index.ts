import { autobind } from 'core-decorators';
import * as firebase from 'firebase/app';
import 'firebase/auth';

// import { User } from 'shared/types/models';
// import { ServerUser } from './types';

class Auth {
  @autobind
  async registration(params: { email: string; password: string; refusalToSubscription: boolean }) {
    const { email, password } = params;
    
    firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  @autobind
  async login(params: { email: string; password: string }) {
    const { email, password } = params;

    //await firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  // @autobind
  // async loadUser(): Promise<User> {
  //   const { data } = await this.actions.get<ServerUser>('auth/users/me/');
  //   return data;
  // }

  @autobind
  async logout() {
    await this.actions.post('auth/logout/');
  }

  @autobind
  async restorePassword(email: string) {
    await this.actions.post('auth/users/reset_password/', { email });
  }

  @autobind
  async confirmRestorePassword(params: { uid: string; token: string; new_password: string }) {
    await this.actions.post('auth/users/reset_password_confirm/', params);
  }

  @autobind
  async changePassword(params: { current_password: string; new_password: string }) {
    await this.actions.post('/auth/users/set_password/', params);
  }
}

export { Auth };
