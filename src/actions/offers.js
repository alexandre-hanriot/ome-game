// action types
export const FETCH_OFFERS = 'FETCH_OFFERS';
export const FETCH_PARAMS_OFFERS = 'FETCH_PARAMS_OFFERS';
export const FETCH_ALL_OFFERS = 'FETCH_ALL_OFFERS';
export const SAVE_OFFERS = 'SAVE_OFFERS';
export const SAVE_ONE_OFFER = 'SAVE_ONE_OFFER';
export const SAVE_OFFER_ID = 'SAVE_OFFER_ID';
export const GET_OFFER = 'GET_OFFER';
export const CLEAR_OFFER = 'CLEAR_OFFER';
export const HANDLE_FORM_INPUT = 'HANDLE_FORM_INPUT';
export const SET_OFFER_IS_LOAD = 'SET_OFFER_IS_LOAD';
export const HANDLE_ADD_OFFER = 'HANDLE_ADD_OFFER';
export const HANDLE_MODIFY_OFFER = 'HANDLE_MODIFY_OFFER';
export const SET_OFFER_IN_FAVORITE = 'SET_OFFER_IN_FAVORITE';
export const SET_OFFER_IN_RESERVATION = 'SET_OFFER_IN_RESERVATION';
export const DELETE_OFFER = 'DELETE_OFFER';
export const UPDATE_LIST_OFFERS = 'UPDATE_LIST_OFFERS';
export const SET_OFFER_SEND = 'SET_OFFER_SEND';
export const SET_UPLOAD_DATA = 'SET_UPLOAD_DATA';
export const OFFER_UPLOAD_IMAGE = 'OFFER_UPLOAD_IMAGE';
export const UPDATE_STATE_OFFERS = 'UPDATE_STATE_OFFERS';
export const UPDATE_STATUS_OFFER = 'UPDATE_STATUS_OFFER';
export const UPDATE_STATUS_STATE_OFFER = 'UPDATE_STATUS_STATE_OFFER';
export const CLEAR_OFFERS = 'CLEAR_OFFERS';
export const UPDATE_STATUS_OFFER2 = 'UPDATE_STATUS_OFFER2';
export const SAVE_OFFERS_ADMIN = 'SAVE_OFFERS_ADMIN';
export const SET_OFFER_DETAIL_IS_LOAD = 'SET_OFFER_DETAIL_IS_LOAD';

// action creators
export const fetchOffers = () => ({
  type: FETCH_OFFERS,
});

export const fetchParamsOffers = () => ({
  type: FETCH_PARAMS_OFFERS,
});

export const fetchAllOffers = (params = {}) => ({
  type: FETCH_ALL_OFFERS,
  params,
});

export const saveOffers = (offers) => ({
  type: SAVE_OFFERS,
  data: offers,
});

export const saveOneOffer = (offer) => ({
  type: SAVE_ONE_OFFER,
  offer,
});

export const saveOfferId = (offerId) => ({
  type: SAVE_OFFER_ID,
  offerId,
});

export const getOffer = () => ({
  type: GET_OFFER,
});

export const changeOfferIsLoad = () => ({
  type: SET_OFFER_IS_LOAD,
});

export const clearOffer = () => ({
  type: CLEAR_OFFER,
});

export const handleFormInput = (identifier, newValue) => ({
  type: HANDLE_FORM_INPUT,
  identifier,
  newValue,
});

export const handleAddOffer = () => ({
  type: HANDLE_ADD_OFFER,
});

export const handleModifyOffer = () => ({
  type: HANDLE_MODIFY_OFFER,
});

export const setOfferInFavorite = (value) => ({
  type: SET_OFFER_IN_FAVORITE,
  value,
});

export const setOfferInReservation = (value) => ({
  type: SET_OFFER_IN_RESERVATION,
  value,
});

export const deleteOffer = () => ({
  type: DELETE_OFFER,
});

export const updateListOffers = (id) => ({
  type: UPDATE_LIST_OFFERS,
  id,
});

export const setOfferSend = (value) => ({
  type: SET_OFFER_SEND,
  value,
});

export const setUploadData = (name, value) => ({
  type: SET_UPLOAD_DATA,
  name,
  value,
});

export const offerUploadImage = () => ({
  type: OFFER_UPLOAD_IMAGE,
});

export const updateStateOffers = (id) => ({
  type: UPDATE_STATE_OFFERS,
  id,
});

export const updateStatusOffer = () => ({
  type: UPDATE_STATUS_OFFER,
});

export const updateStatusStateOffer = (id) => ({
  type: UPDATE_STATUS_STATE_OFFER,
  id,
});

export const clearOffers = () => ({
  type: CLEAR_OFFERS,
});

export const updateStatusOffer2 = (id, status) => ({
  type: UPDATE_STATUS_OFFER2,
  id,
  status,
});

export const saveOffersAdmin = (data) => ({
  type: SAVE_OFFERS_ADMIN,
  data,
});

export const changeOfferDetailIsLoad = () => ({
  type: SET_OFFER_DETAIL_IS_LOAD,
});
