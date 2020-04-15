// action types
export const FETCH_OFFERS = 'FETCH_OFFERS';
export const FETCH_PARAMS_OFFERS = 'FETCH_PARAMS_OFFERS';
export const SAVE_OFFERS = 'SAVE_OFFERS';

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
