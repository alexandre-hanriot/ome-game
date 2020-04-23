
import {
  SAVE_RESERVATIONS,
  SAVE_ID_RESERVATION,
  SAVE_ONE_RESERVATION,
  FIND_THE_RESERVATION,
  UPDATE_LIST_RESERVATIONS,
  SAVE_STATUS_RESERVATION,
  SAVE_LISTOFFER_RESERVATION,
  UPDATE_STATUS_STATE_RESERVATION,
} from 'src/actions/reservations';

const initialState = {
  allReservations: [],
  idReservation: '',
  oneReservation: {},
  reservation: {},
  statusReservation: '',
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

    case UPDATE_LIST_RESERVATIONS:
    {
      const remainReservations = state.allReservations.filter((reservation) => {
        if (reservation.id.toString() !== action.id.toString()) {
          return true;
        }
      });
      return {
        ...state,
        allReservations: remainReservations,
      };
    }

    case SAVE_STATUS_RESERVATION:
      return {
        ...state,
        statusReservation: action.status,
      };

    default: return state;
  }
};

export default reservationsReducer;
