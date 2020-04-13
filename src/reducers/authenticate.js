import { CHANGE_INPUT_OF_LOGIN, LOG_USER, SUBMIT_LOGIN } from 'src/actions/authenticate';

const initialState = {
  email: 'toto@toto.toto',
  password: 'yoloswag',
  islogged: false,
};

const authenticateReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_INPUT_OF_LOGIN:
      if (action.inputIdentifier === 'email') {
        return {
          ...state,
          email: action.newValue,
        };
      }
      if (action.inputIdentifier === 'password') {
        return {
          ...state,
          password: action.newValue,
        };
      }
      break;
    case LOG_USER:
      return {
        ...state,
        isLogged: true,
      };
    case SUBMIT_LOGIN:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authenticateReducer;
