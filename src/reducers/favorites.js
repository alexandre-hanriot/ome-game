import {
  SAVE_FAVORITES,
  SAVE_ID_FAVORITE,
  UPDATE_NOTIFY_FAVORITES,
  UPDATE_FAVORITES,
  SAVE_CURRENT_FAVORITE,
} from 'src/actions/favorites';

const initialState = {
  allFavorites: [],
  notifyfavorite: false,
  idFavorite: '',
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

export default favoritesReducer;
