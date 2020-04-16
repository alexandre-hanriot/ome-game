import { SAVE_FAVORITES } from 'src/actions/favorites';

const initialState = {
  allFavorites: [],
  // indique si on est en train de charger des données depuis l'API
  // loading: true,
};

const favoritesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_FAVORITES:
      return {
        ...state,
        allFavorites: action.favorites,
        // loading: false,
      };

    default: return state;
  }
};
// => Pour accéder au state défini dans le reducer 'recipesReducer', il faudra que je
// descende dans le tiroir 'recipes' => state.recipes.xxxx

export default favoritesReducer;
