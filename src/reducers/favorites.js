import { SAVE_FAVORITES, SAVE_CURRENT_FAVORITE } from 'src/actions/favorites';

const initialState = {
  allFavorites: [],
  currentFavorite: 0,
};

const favoritesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_FAVORITES:
      return {
        ...state,
        allFavorites: action.favorites,
      };

    case SAVE_CURRENT_FAVORITE:
      return {
        ...state,
        currentFavorite: action.value,
      };

    default: return state;
  }
};

export default favoritesReducer;
