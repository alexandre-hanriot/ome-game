import {
  CHANGE_INPUT_OF_LOGIN, LOG_USER, SUBMIT_LOGIN, CHANGE_LOGIN_ERROR,
} from 'src/actions/user';

const initialState = {
  email: '',
  password: '',
  isLogged: false,
  userData: null,
  loginError: '',
};

const userReducer = (state = initialState, action = {}) => {
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
        userData: action.userData,
      };
    case SUBMIT_LOGIN:
      return {
        ...state,
      };
    case CHANGE_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.message,
      };
    default:
      return state;
  }
};

export default userReducer;
