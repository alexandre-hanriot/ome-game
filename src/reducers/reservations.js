
import {
  SAVE_RESERVATIONS,
  SAVE_ID_RESERVATION,
  SAVE_ONE_RESERVATION,
  FIND_THE_RESERVATION,
  UPDATE_LIST_RESERVATIONS,
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

    case UPDATE_LIST_RESERVATIONS:
    {
      console.log('action mise à jour dans le réducers', action.id);
      const remainReservations = state.allReservations.filter((reservation) => {
        console.log(reservation.id);
        console.log(action.id);
        if (reservation.id.toString() !== action.id.toString()) {
          return true;
        }
      });
      console.log(remainReservations);
      return {
        ...state,
        allReservations: remainReservations,
      };
    }

    default: return state;
  }
};

export default reservationsReducer;
