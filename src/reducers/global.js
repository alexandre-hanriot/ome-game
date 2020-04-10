import { SHOW_MODAL, SHOW_MENU } from '../actions/global';

const initialState = {
  showModal: '',
  showMenu: false,
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

    default:
      return state;
  }
};

export default reducer;
