export const FETCH_RESERVATIONS = 'FETCH_RESERVATIONS';
export const FETCH_PARAMS_RESERVATIONS = 'FETCH_PARAMS_RESERVATIONS';
export const FETCH_ONE_RESERVATION = 'FETCH_ONE_RESERVATION';
export const SAVE_ID_RESERVATION = 'SAVE_ID_RESERVATION';
export const SAVE_RESERVATIONS = 'SAVE_RESERVATIONS';
export const SAVE_ONE_RESERVATION = 'SAVE_ONE_RESERVATION';


export const fetchReservations = () => ({
  type: FETCH_RESERVATIONS,
});

export const fetchParamsReservations = () => ({
  type: FETCH_PARAMS_RESERVATIONS,
});

export const fetchOneReservation = () => ({
  type: FETCH_ONE_RESERVATION,
});

export const saveIdReservation = (id) => ({
  type: SAVE_ID_RESERVATION,
  id,
});

export const saveReservations = (reservations) => ({
  type: SAVE_RESERVATIONS,
  reservations,
});

export const saveOneReservation = (oneReservation) => ({
  type: SAVE_ONE_RESERVATION,
  oneReservation,
});
