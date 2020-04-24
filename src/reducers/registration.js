import {
  CHANGE_INPUT, SUBMIT_REGISTRATION, SAVE_USER, CHANGE_REGISTRATION_ERROR,
  CHECK_LEGAL_MENTIONS, CLEAR_MODAL_INPUTS,
} from 'src/actions/registration';


const initialState = {
  email: '',
  pseudo: '',
  password: '',
  confirmPassword: '',
  errorMessage: '',
  isLegalMentionsChecked: false,
  requestIsLoad: false,
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
        errorMessage: '',
      };
    case CHANGE_REGISTRATION_ERROR:
      return {
        ...state,
        errorMessage: action.message,
        password: '',
        confirmPassword: '',
      };
    case CHECK_LEGAL_MENTIONS:
      return {
        ...state,
        isLegalMentionsChecked: !state.isLegalMentionsChecked,
      };
    case CLEAR_MODAL_INPUTS:
      return {
        ...state,
        email: '',
        pseudo: '',
        password: '',
        confirmPassword: '',
        errorMessage: '',
        isLegalMentionsChecked: false,
      };
    default:
      return state;
  }
};

export default registrationReducer;
