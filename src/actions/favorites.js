export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const SAVE_FAVORITES = 'SAVE_FAVORITES';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const CHECK_OFFER_IN_FAVORITE = 'CHECK_OFFER_IN_FAVORITE';

export const fetchFavorites = () => ({
  type: FETCH_FAVORITES,
});

export const saveFavorites = (favorites) => ({
  type: SAVE_FAVORITES,
  favorites,
});

export const addFavorite = () => ({
  type: ADD_FAVORITE,
});

export const checkOfferInFavorite = () => ({
  type: CHECK_OFFER_IN_FAVORITE,
});
