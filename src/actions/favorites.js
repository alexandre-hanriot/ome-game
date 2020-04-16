export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const SAVE_FAVORITES = 'SAVE_FAVORITES';

export const fetchFavorites = () => ({
  type: FETCH_FAVORITES,
});

export const saveFavorites = (favorites) => ({
  type: SAVE_FAVORITES,
  favorites,
});
