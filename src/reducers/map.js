import {
  SET_MAP_LOADED,
  SET_BOUNDS,
  SET_ZOOM,
  SET_COORDINATES,
  SET_RESULTS,
  SAVE_OFFERS,
  SAVE_GAMES,
  SAVE_GAMES_CATEGORIES,
  SET_FIELD_GAME,
  SET_FIELD_PLAYERS,
  SET_FILTER_DISPONIBILITY,
  SET_FILTER_TYPE,
  SET_FILTER_CATEGORIES,
  SET_FILTER_GAMES,
  SET_FILTER_PLAYERS,
} from 'src/actions/map';

const initialState = {
  mapLoaded: false,
  defaultZoom: 6,
  defaultCoordinates: {
    lat: 46.227638,
    lng: 2.213749,
  },
  bounds: [-13.276973656249993, 41.76547338746258, 17.704471656250007, 50.35448621080039],
  zoom: 6,
  coordinates: {
    lat: 46.227638,
    lng: 2.213749,
  },
  offers: [],
  results: [],
  games: [],
  gamesCategories: [],
  fieldGame: '',
  fieldPlayers: '',
  filterLastUpdate: 0,
  filterPlace: {
    coordinates: {
      lat: 0,
      lng: 0,
    },
    name: '',
  },
  filterGames: [],
  filterType: 'all',
  filterDisponibility: 'all',
  filterCategories: [],
  filterPlayers: 0,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_MAP_LOADED:
      return {
        ...state,
        mapLoaded: true,
      };

    case SET_BOUNDS:
      return {
        ...state,
        bounds: action.bounds,
      };

    case SET_ZOOM:
      return {
        ...state,
        zoom: action.zoom,
      };

    case SET_COORDINATES:
      return {
        ...state,
        coordinates: {
          lat: action.lat,
          lng: action.lng,
        },
      };

    case SET_RESULTS:
      return {
        ...state,
        results: action.results,
      };

    case SAVE_OFFERS:
      return {
        ...state,
        offers: action.offers,
      };

    case SAVE_GAMES:
      return {
        ...state,
        games: action.games,
      };

    case SAVE_GAMES_CATEGORIES:
      return {
        ...state,
        gamesCategories: action.categories,
      };

    case SET_FIELD_GAME:
      return {
        ...state,
        fieldGame: action.value,
      };

    case SET_FIELD_PLAYERS:
      return {
        ...state,
        fieldPlayers: action.value,
      };

    case SET_FILTER_DISPONIBILITY:
      return {
        ...state,
        filterDisponibility: action.value,
        filterLastUpdate: new Date().getTime(),
      };

    case SET_FILTER_TYPE:
      return {
        ...state,
        filterType: action.value,
        filterLastUpdate: new Date().getTime(),
      };

    case SET_FILTER_CATEGORIES: {
      const value = Number(action.value);
      if (!state.filterCategories.includes(value)) {
        return {
          ...state,
          filterCategories: [...state.filterCategories, value],
          filterLastUpdate: new Date().getTime(),
        };
      }
      return state;
    }

    case SET_FILTER_GAMES: {
      if (state.fieldGame !== '' && !state.filterGames.includes(state.fieldGame)) {
        return {
          ...state,
          filterGames: [...state.filterGames, state.fieldGame.trim()],
          filterLastUpdate: new Date().getTime(),
          fieldGame: '',
        };
      }
      return {
        ...state,
        fieldGame: '',
      };
    }

    case SET_FILTER_PLAYERS:
      if (isNaN(state.fieldPlayers)) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        filterPlayers: Number(state.fieldPlayers),
        filterLastUpdate: new Date().getTime(),
        fieldPlayers: '',
      };

    default:
      return state;
  }
};

export default reducer;
