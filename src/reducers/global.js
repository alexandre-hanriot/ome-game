import {
  SHOW_MODAL,
  SHOW_MENU,
  SHOW_ALERT,
  SET_IS_ERROR,
  REDIRECT_TO,
} from 'src/actions/global';

const initialState = {
  showModal: '',
  showMenu: '',
  alertMessage: ' ',
  alertSuccess: true,
  showAlert: false,
  isError: false,
  redirectTo: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        showModal: action.name,
      };

    case SHOW_MENU:
      return {
        ...state,
        showMenu: action.name,
      };
    case SHOW_ALERT:
      return {
        ...state,
        alertMessage: action.message,
        alertSuccess: action.success,
        showAlert: !state.showAlert,
      };

    case SET_IS_ERROR:
      return {
        ...state,
        isError: !state.isError,
      };

    case REDIRECT_TO:
      return {
        ...state,
        redirectTo: action.url,
      };

    default:
      return state;
  }
};

export default reducer;
