import {
  SHOW_MODAL, SHOW_MENU, SHOW_ALERT,
} from '../actions/global';

const initialState = {
  showModal: '',
  showMenu: false,
  alertMessage: ' ',
  alertSuccess: true,
  showAlert: false,
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
        showMenu: !state.showMenu,
      };
    case SHOW_ALERT:
      return {
        ...state,
        alertMessage: action.message,
        alertSuccess: action.success,
        showAlert: !state.showAlert,
      };
    default:
      return state;
  }
};

export default reducer;
