import { CHANGE_INPUT, SAVE_USER } from 'src/actions/registration';

const initialState = {
  email: 'toto@toto.toto',
  pseudo: 'toto',
  password: 'toto',
  confirmPassword: 'toto',
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
    case SAVE_USER: {
      if (action.password === action.confirmPassword) {
        return {
          ...state,
          email: action.email,
          pseudo: action.pseudo,
          password: action.password,
          confirmPassword: '',
        };
      }
      break;
    }
    default:
      return state;
  }
};

export default registrationReducer;
