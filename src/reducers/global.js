import {
  SHOW_MODAL, SHOW_MENU, SHOW_ALERT, DISPLAY_ALERT,
} from '../actions/global';

const initialState = {
  showModal: false,
  showMenu: false,
  alertMessage: 'Le message d\'information à l\'utilisateur',
  alertSuccess: true,
  showAlert: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        showModal: !state.showModal,
      };

    case SHOW_MENU:
      return {
        ...state,
        showMenu: !state.showMenu,
      };
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: !state.showAlert,
      };
    case SHOW_ALERT:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
