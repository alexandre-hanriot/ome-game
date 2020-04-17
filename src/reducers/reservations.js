
import { SAVE_RESERVATIONS } from 'src/actions/reservations';

const initialState = {
  allReservations: [],
};

const reservationsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_RESERVATIONS:
      return {
        ...state,
        allReservations: action.reservations,
      };

    default: return state;
  }
};

export default reservationsReducer;
