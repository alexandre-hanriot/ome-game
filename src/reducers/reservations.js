
import { SAVE_RESERVATIONS, FIND_THE_RESERVATION } from 'src/actions/reservations';

const initialState = {
  allReservations: [],
  reservation: {},
};

const reservationsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_RESERVATIONS:
      return {
        ...state,
        allReservations: action.reservations,
      };
    case FIND_THE_RESERVATION:
      return {
        ...state,
        reservation: action.reservation,
      };
    default: return state;
  }
};

export default reservationsReducer;
