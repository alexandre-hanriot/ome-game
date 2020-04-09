import { HANDLE_MENU } from '../actions/header';

const initialState = {
  menuOpen: false,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case HANDLE_MENU:
      return {
        ...state,
        menuOpen: !state.menuOpen,
      };

    default:
      return state;
  }
}

export default reducer;
