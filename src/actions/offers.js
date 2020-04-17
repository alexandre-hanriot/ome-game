// action types
export const FETCH_OFFERS = 'FETCH_OFFERS';
export const FETCH_PARAMS_OFFERS = 'FETCH_PARAMS_OFFERS';
export const SAVE_OFFERS = 'SAVE_OFFERS';
export const SAVE_ONE_OFFER = 'SAVE_ONE_OFFER';
export const GET_OFFER_ID = 'GET_OFFER_ID';
export const GET_OFFER = 'GET_OFFER';
export const CLEAR_OFFER = 'CLEAR_OFFER';
export const HANDLE_FORM_INPUT = 'HANDLE_FORM_INPUT';
export const SET_OFFER_IS_LOAD = 'SET_OFFER_IS_LOAD';

// action creators
export const fetchOffers = () => ({
  type: FETCH_OFFERS,
});

export const fetchParamsOffers = () => ({
  type: FETCH_PARAMS_OFFERS,
});

export const saveOffers = (offers) => ({
  type: SAVE_OFFERS,
  data: offers,
});

export const saveOneOffer = (offer) => ({
  type: SAVE_ONE_OFFER,
  offer,
});

export const getOfferId = (offerId) => ({
  type: GET_OFFER_ID,
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
