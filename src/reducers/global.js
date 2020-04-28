import {
  SHOW_MODAL,
  SHOW_MENU,
  SHOW_ALERT,
  SET_IS_ERROR,
  REDIRECT_TO,
  SET_APP_LOADING,
  SET_UPDATE,
} from 'src/actions/global';

const initialState = {
  showModal: '',
  showMenu: '',
  alertMessage: ' ',
  alertSuccess: true,
  showAlert: false,
  isError: false,
  redirectTo: '',
  modalParams: {},
  appIsLoad: false,
  update: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        showModal: action.name,
        modalParams: action.params,
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

    case SET_APP_LOADING:
      return {
        ...state,
        appIsLoad: action.value,
      };

    case SET_UPDATE:
      return {
        ...state,
        update: action.value,
      };

    default:
      return state;
  }
};

export default reducer;
