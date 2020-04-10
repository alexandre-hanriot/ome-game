export const SHOW_MODAL = 'SHOW_MODAL';
export const SHOW_MENU = 'SHOW_MENU';

export const showModal = (name) => ({
  type: SHOW_MODAL,
  name,
});

export const showMenu = () => ({
  type: SHOW_MENU,
});
