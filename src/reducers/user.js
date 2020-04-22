import {
  CHANGE_INPUT_OF_LOGIN,
  LOG_USER, SUBMIT_LOGIN,
  CHANGE_LOGIN_ERROR,
  CLEAR_LOGIN_ERROR,
  LOG_OUT, SET_REQUEST_LOAD,
  CHANGE_PROFIL_INPUT,
  CLEAR_PROFIL_PASSWORDS,
  SAVE_USERS,
} from 'src/actions/user';

const initialState = {
  allUsers: [],
  email: '',
  password: '',
  isLogged: false,
  userData: {
    user: {
      id: 0,
      role: '',
      status: '',
      picture: '',
      email: '',
      password: '',
      old_password: '',
      new_password: '',
      confirm_new_password: '',
      username: '',
      firstname: '',
      lastname: '',
      phone: 1234567890,
      address: '',
      postal_code: '',
      city: '',
      display_name: false,
      gdpr_accepted_at: '',
      createdAt: '',
    },
    xsrfToken: '',
  },
  loginError: '',
  requestIsLoad: false,
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
        password: '',
        email: '',
      };
    case SUBMIT_LOGIN:
      return {
        ...state,
        userData: {
          ...state.userData,
          user: {
            ...state.userData.user,
            old_password: '',
            new_password: '',
            confirm_new_password: '',
          },
        },
      };
    case CHANGE_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.message,
        password: '',
      };
    case CLEAR_LOGIN_ERROR:
      return {
        ...state,
        loginError: '',
        email: '',
        password: '',
      };
    case LOG_OUT:
      return {
        ...state,
        isLogged: false,
        userData: '',
      };
    case SET_REQUEST_LOAD:
      return {
        ...state,
        requestIsLoad: !state.requestIsLoad,
      };
    case CHANGE_PROFIL_INPUT: {
      const target = action.identifier;
      return {
        ...state,
        userData: {
          ...state.userData,
          user: {
            ...state.userData.user,
            [target]: action.newValue,
          },
        },
      };
    }
    case CLEAR_PROFIL_PASSWORDS:
      return {
        ...state,
        userData: {
          ...state.userData,
          user: {
            ...state.userData.user,
            old_password: '',
            new_password: '',
            confirm_new_password: '',
          },
        },
      };

    case SAVE_USERS:
      return {
        ...state,
        allUsers: action.users,
      };

    default:
      return state;
  }
};

export default userReducer;
