import { SHOW_MODAL } from '../actions/reservations';

const initialState = {
  showModal: false,
};

const reservationsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        showModal: !state.showModal,
      };
    default: return state;
  }
};

export default reservationsReducer;
