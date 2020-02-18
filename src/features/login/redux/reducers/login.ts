import { initial } from '../initial';

function loginReducer(state = initial, action) {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        profile: action.payload,
      };
    }
    default:
      return state;
  }
}

export { loginReducer };
