import {
  SAVE_FAVORITES,
  SAVE_ID_FAVORITE,
  UPDATE_NOTIFY_FAVORITES,
  UPDATE_FAVORITES,
} from 'src/actions/favorites';

const initialState = {
  allFavorites: [],
  notifyfavorite: false,
  idFavorite: '',
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

    case SAVE_ID_FAVORITE: {
      let notify = false;
      if (action.notifyFavorite === 'true') {
        notify = true;
      }
      return {
        ...state,
        idFavorite: action.idFavorite,
        notifyfavorite: !notify,
      };
    }

    case UPDATE_NOTIFY_FAVORITES:
    {
      const favorites = state.allFavorites.map((favorite) => {
        if (favorite.id.toString() === action.id.toString()) {
          return ({
            ...favorite,
            notify_when_available: action.notify,
          });
        }
        return ({
          ...favorite,
        });
      });
      return {
        ...state,
        allFavorites: favorites,
      };
    }

    case UPDATE_FAVORITES:
    {
      console.log('action mise à jour dans le réducers', action.id);
      const remainFavorites = state.allFavorites.filter((favorite) => {
        if (favorite.id.toString() !== action.id.toString()) {
          return true;
        }
      });
      return {
        ...state,
        allFavorites: remainFavorites,
      };
    }

    default: return state;
  }
};
// => Pour accéder au state défini dans le reducer 'recipesReducer', il faudra que je
// descende dans le tiroir 'recipes' => state.recipes.xxxx

export default favoritesReducer;
