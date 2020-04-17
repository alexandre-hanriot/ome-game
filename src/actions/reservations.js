export const FETCH_RESERVATIONS = 'FETCH_RESERVATIONS';
export const FETCH_PARAMS_RESERVATIONS = 'FETCH_PARAMS_RESERVATIONS';
export const SAVE_RESERVATIONS = 'SAVE_RESERVATIONS';
export const ADD_RESERVATION = 'ADD_RESERVATION';

export const fetchReservations = () => ({
  type: FETCH_RESERVATIONS,
});

export const fetchParamsReservations = () => ({
  type: FETCH_PARAMS_RESERVATIONS,
});

export const saveReservations = (reservations) => ({
  type: SAVE_RESERVATIONS,
  reservations,
});

export const addReservation = () => ({
  type: ADD_RESERVATION,
});
