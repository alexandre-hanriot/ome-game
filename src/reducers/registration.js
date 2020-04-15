import {
  CHANGE_INPUT, SUBMIT_REGISTRATION, SAVE_USER, CHANGE_REGISTRATION_ERROR,
} from 'src/actions/registration';

const initialState = {
  email: '',
  pseudo: '',
  password: '',
  confirmPassword: '',
  errorMessage: '',
};

const registrationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      const target = action.identifier;
      return {
        ...state,
        [target]: action.newValue,
      };
    }
    case SAVE_USER:
      return {
        ...state,
      };
    case SUBMIT_REGISTRATION:
      return {
        ...state,
        password: '',
        confirmPassword: '',
        email: '',
        pseudo: '',
        errorMessage: '',
      };
    case CHANGE_REGISTRATION_ERROR:
      return {
        ...state,
        errorMessage: action.message,
        password: '',
        confirmPassword: '',
      };
    default:
      return state;
  }
};

export default registrationReducer;
