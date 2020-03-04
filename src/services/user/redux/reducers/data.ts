import * as NS from '../../namespace';
import { initial } from '../initial';

function dataReducer(
  state: NS.IReduxState['data'] = initial.data,
  action: NS.IUser,
): NS.IReduxState['data'] {
  switch (action.type) {
    case 'USER:UPDATE_USER': {
      return { ...state, user: action.payload };
    }
    default: {
      return state;
    }
  }
}

export { dataReducer };
