import {
  SHOW_MODAL, SHOW_MENU, SHOW_ALERT,
} from 'src/actions/global';

const initialState = {
  showModal: '',
  showMenu: '',
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
        showMenu: action.name,
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
