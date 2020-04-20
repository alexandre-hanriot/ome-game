import {
  SAVE_GAME_CATEGORIES,
  SAVE_GAMES,
  SET_GAME_IS_LOAD,
  SET_CATEGORIES_IS_LOAD,
  SET_NEW_GAME_FIELD,
  HANDLE_FORM_INPUT_GAME,
} from 'src/actions/game';

const initialState = {
  games: [],
  categories: [],
  gamesIsLoad: false,
  categoriesIsLoad: false,
  newGameField: false,
  game: {
    name: '',
    nb_players_min: '',
    nb_players_max: '',
    age_min: '',
    duration: '',
    description: '',
    gameCategoryId: 0,
  },
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

    case SET_NEW_GAME_FIELD:
      return {
        ...state,
        newGameField: action.value,
      };

    case HANDLE_FORM_INPUT_GAME: {
      if (['nb_players_min', 'nb_players_max', 'age_min', 'gameCategoryId'].includes(action.name)) {
        if (action.value !== '') {
          action.value = Number(action.value);
          if (Number.isNaN(action.value)) {
            action.value = '';
          }
        }
      }
      return {
        ...state,
        game: {
          ...state.game,
          [action.name]: action.value,
        },
      };
    }

    default:
      return state;
  }
};

export default gameReducer;
