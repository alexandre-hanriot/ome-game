
import {
  SAVE_RESERVATIONS,
  SAVE_ID_RESERVATION,
  SAVE_ONE_RESERVATION,
  FIND_THE_RESERVATION,
} from 'src/actions/reservations';

const initialState = {
  allReservations: [],
  idReservation: '',
  oneReservation: {},
  reservation: {},
  // indique si on est en train de charger des données depuis l'API
  // loading: true,
};
const reservationsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_RESERVATIONS:
      return {
        ...state,
        allReservations: action.reservations,
      };

    case SAVE_ID_RESERVATION:
      return {
        ...state,
        idReservation: action.id,

      };

    case SAVE_ONE_RESERVATION:
      return {
        ...state,
        oneReservation: action.oneReservation,
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
