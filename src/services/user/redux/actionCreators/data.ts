import * as NS from '../../namespace';

function updateUser(user: NS.IUser | null): NS.UpdateUser {
  return { type: 'USER:UPDATE_USER', payload: user };
}

export { updateUser };
