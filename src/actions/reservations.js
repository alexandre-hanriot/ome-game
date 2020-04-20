export const FETCH_RESERVATIONS = 'FETCH_RESERVATIONS';
export const FETCH_PARAMS_RESERVATIONS = 'FETCH_PARAMS_RESERVATIONS';
export const SAVE_RESERVATIONS = 'SAVE_RESERVATIONS';
export const FIND_THE_RESERVATION = 'FIND_THE_RESERVATION';
export const ADD_RESERVATION = 'ADD_RESERVATION';
export const CHECK_OFFER_IN_RESERVATION = 'CHECK_OFFER_IN_RESERVATION';

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


export const findTheReservation = (reservation) => ({
  type: FIND_THE_RESERVATION,
  reservation,
});

export const addReservation = () => ({
  type: ADD_RESERVATION,
});

export const checkOfferInReservation = () => ({
  type: CHECK_OFFER_IN_RESERVATION,
});
