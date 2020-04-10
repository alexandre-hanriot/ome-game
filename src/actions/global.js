export const SHOW_MODAL = 'SHOW_MODAL';
export const SHOW_MENU = 'SHOW_MENU';
export const DISPLAY_ALERT = 'DISPLAY_ALERT';
export const SHOW_ALERT = 'SHOW_ALERT';
export const CHANGE_ALERT_MESSAGE = 'CHANGE_ALERT_MESSAGE';

export const showModal = () => ({
  type: SHOW_MODAL,
});

export const showMenu = () => ({
  type: SHOW_MENU,
});

export const displayAlert = () => ({
  type: DISPLAY_ALERT,
});

export const showAlert = () => ({
  type: SHOW_ALERT,
});

export const changeAlertMessage = () => ({
  type: CHANGE_ALERT_MESSAGE,
});
