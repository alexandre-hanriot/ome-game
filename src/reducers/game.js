import {
  SAVE_GAME_CATEGORIES, SAVE_GAMES, SET_GAME_IS_LOAD, SET_CATEGORIES_IS_LOAD,
} from 'src/actions/game';

const initialState = {
  games: [],
  categories: [],
  gamesIsLoad: false,
  categoriesIsLoad: false,
};

const gameReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_GAME_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case SAVE_GAMES:
      return {
        ...state,
        games: action.games,
      };
    case SET_GAME_IS_LOAD:
      return {
        ...state,
        gamesIsLoad: !state.gamesIsLoad,
      };
    case SET_CATEGORIES_IS_LOAD:
      return {
        ...state,
        categoriesIsLoad: !state.categoriesIsLoad,
      };
    default:
      return state;
  }
};

export default gameReducer;
