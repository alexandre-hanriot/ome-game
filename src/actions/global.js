export const SHOW_MODAL = 'SHOW_MODAL';
export const SHOW_MENU = 'SHOW_MENU';
export const SHOW_ALERT = 'SHOW_ALERT';
export const SET_IS_ERROR = 'SET_IS_ERROR';
export const REDIRECT_TO = 'REDIRECT_TO';

// Modal
export const showModal = (name = '') => ({
  type: SHOW_MODAL,
  name,
});

// burger menu
export const showMenu = (name = '') => ({
  type: SHOW_MENU,
  name,
});

// windows Alert
export const showAlert = (message = '', success = true) => ({
  type: SHOW_ALERT,
  message,
  success,
});

export const changeIsError = () => ({
  type: SET_IS_ERROR,
});

export const redirectTo = (url) => ({
  type: REDIRECT_TO,
  url,
});
