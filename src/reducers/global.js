import { SHOW_MODAL, SHOW_MENU } from '../actions/global';

const initialState = {
  showModal: false,
  showMenu: false,
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

    default:
      return state;
  }
};

export default reducer;
