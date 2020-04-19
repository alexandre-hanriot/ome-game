import {
  SET_FIELD,
} from 'src/actions/contact';

const initialState = {
  name: '',
  forename: '',
  email: '',
  message: '',
  legalMentions: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_FIELD:
      return {
        ...state,
        [action.name]: action.value,
      };

    default:
      return state;
  }
};

export default reducer;
