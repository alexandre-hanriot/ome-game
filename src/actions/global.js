export const SHOW_MODAL = 'SHOW_MODAL';
export const SHOW_MENU = 'SHOW_MENU';
export const SHOW_ALERT = 'SHOW_ALERT';

export const showModal = (name = '') => ({
  type: SHOW_MODAL,
  name,
});

export const showMenu = () => ({
  type: SHOW_MENU,
});

export const showAlert = (message = '', success = true) => ({
  type: SHOW_ALERT,
  message,
  success,
});
