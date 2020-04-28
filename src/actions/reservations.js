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
export const UPDATE_VALIDATE_RESERVATION = 'UPDATE_VALIDATE_RESERVATION';
export const UPDATE_STATUS_RESERVATION = 'UPDATE_STATUS_RESERVATION';
export const SAVE_LISTOFFER_RESERVATION = 'SAVE_LISTOFFER_RESERVATION';
export const SAVE_STATUS_RESERVATION = 'SAVE_SATUS_RESERVATION';
export const UPDATE_STATUS_FINISHED_RESERVATION = 'UPDATE_STATUS_FINISHED_RESERVATION';
export const CHANGE_RESERVATIONS_LOAD = 'CHANGE_RESERVATIONS_LOAD';
export const FETCH_ALL_RESERVATIONS = 'FETCH_ALL_RESERVATIONS';
export const CLEAR_RESERVATIONS = 'CLEAR_RESERVATIONS';
export const SAVE_RESERVATIONS_ADMIN = 'SAVE_RESERVATIONS_ADMIN';

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

export const saveReservationsAdmin = (data) => ({
  type: SAVE_RESERVATIONS_ADMIN,
  data,
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

export const updateValidateReservation = () => ({
  type: UPDATE_VALIDATE_RESERVATION,
});

export const updateStatusReservation = () => ({
  type: UPDATE_STATUS_RESERVATION,
});

export const saveListofferReservation = (id) => ({
  type: SAVE_LISTOFFER_RESERVATION,
  id,
});

export const saveStatusReservation = (status) => ({
  type: SAVE_STATUS_RESERVATION,
  status,
});

export const updateStatusFinishedReservation = () => ({
  type: UPDATE_STATUS_FINISHED_RESERVATION,
});

export const fetchAllReservations = (params = {}) => ({
  type: FETCH_ALL_RESERVATIONS,
  params,
});


export const changeReservationsLoad = () => ({
  type: CHANGE_RESERVATIONS_LOAD,
});

export const clearReservations = () => ({
  type: CLEAR_RESERVATIONS,
});
