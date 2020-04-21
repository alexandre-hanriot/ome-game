export const FETCH_RESERVATIONS = 'FETCH_RESERVATIONS';
export const FETCH_PARAMS_RESERVATIONS = 'FETCH_PARAMS_RESERVATIONS';
export const FETCH_ONE_RESERVATION = 'FETCH_ONE_RESERVATION';
export const SAVE_ID_RESERVATION = 'SAVE_ID_RESERVATION';
export const SAVE_RESERVATIONS = 'SAVE_RESERVATIONS';
export const SAVE_ONE_RESERVATION = 'SAVE_ONE_RESERVATION';
export const FIND_THE_RESERVATION = 'FIND_THE_RESERVATION';
export const ADD_RESERVATION = 'ADD_RESERVATION';
export const CHECK_OFFER_IN_RESERVATION = 'CHECK_OFFER_IN_RESERVATION';
export const DELETE_RESERVATION = 'DELETE_RESERVATION';
export const UPDATE_LIST_RESERVATIONS = 'UPDATE_LIST_RESERVATIONS';

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

export const deleteReservation = () => ({
  type: DELETE_RESERVATION,
});

export const updateListReservations = (id) => ({
  type: UPDATE_LIST_RESERVATIONS,
  id,
});
