import { SHOW_MODAL, SHOW_MENU, SHOW_MODAL_AUTH } from '../actions/global';

const initialState = {
  showModal: '',
  showMenu: false,
  // showModalAuthentification: 'login',
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

    // case SHOW_MODAL_AUTH:
    //   return {
    //     ...state,
    //     showModalAuthentification: action.name,
    //   };

    default:
      return state;
  }
};

export default reducer;
