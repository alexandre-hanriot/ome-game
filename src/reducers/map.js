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
  REMOVE_FILTER,
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
  filters: {
    place: {
      coordinates: {
        lat: 0,
        lng: 0,
      },
      name: '',
    },
    games: [],
    type: 'all',
    disponibility: 'all',
    categories: [],
    players: 0,
  },
  tags: [],
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

    case SET_FILTER_DISPONIBILITY: {
      let isExist = false;
      let tags = state.tags.map((tag) => {
        if (tag.type === 'disponibility') {
          isExist = true;
          return {
            type: 'disponibility',
            value: action.value,
            name: action.name,
          };
        }
        return tag;
      });

      if (!isExist) {
        tags = [...state.tags, { type: 'disponibility', value: action.value, name: action.name }];
      }

      return {
        ...state,
        filters: {
          ...state.filters,
          disponibility: action.value,
        },
        tags,
      };
    }

    case SET_FILTER_TYPE: {
      let isExist = false;
      let tags = state.tags.map((tag) => {
        if (tag.type === 'type') {
          isExist = true;
          return {
            type: 'type',
            value: action.value,
            name: action.name,
          };
        }
        return tag;
      });

      if (!isExist) {
        tags = [...state.tags, { type: 'type', value: action.value, name: action.name }];
      }

      return {
        ...state,
        filters: {
          ...state.filters,
          type: action.value,
        },
        tags,
      };
    }

    case SET_FILTER_CATEGORIES: {
      const id = Number(action.value);
      const isExist = state.filters.categories.find((category) => category.id === id);

      if (!isExist) {
        const value = {
          id,
          name: action.name,
        };

        return {
          ...state,
          filters: {
            ...state.filters,
            categories: [...state.filters.categories, value],
          },
          tags: [...state.tags, { type: 'categories', value: id, name: action.name }],
        };
      }
      return state;
    }

    case SET_FILTER_GAMES: {
      if (state.fieldGame !== '' && !state.filters.games.includes(state.fieldGame)) {
        const value = state.fieldGame.trim();
        return {
          ...state,
          filters: {
            ...state.filters,
            games: [...state.filters.games, value],
          },
          tags: [...state.tags, { type: 'games', value, name: value }],
          fieldGame: '',
        };
      }
      return {
        ...state,
        fieldGame: '',
      };
    }

    case SET_FILTER_PLAYERS: {
      if (isNaN(state.fieldPlayers)) {
        return {
          ...state,
        };
      }

      const value = Number(state.fieldPlayers);

      let isExist = false;
      let tags = state.tags.map((tag) => {
        if (tag.type === 'players') {
          isExist = true;
          return {
            type: 'players',
            value,
            name: `Joueurs: ${value}`,
          };
        }
        return tag;
      });

      if (!isExist) {
        tags = [...state.tags, { type: 'players', value, name: `Joueurs: ${value}` }];
      }

      return {
        ...state,
        filters: {
          ...state.filters,
          players: value,
        },
        tags,
        fieldPlayers: '',
      };
    }

    case REMOVE_FILTER: {
      const tags = state.tags.filter((tag) => (tag.type !== action.name || tag.value.toString() !== action.value.toString()));
      let { filters } = state;

      switch (action.name) {
        case 'disponibility':
          filters = {
            ...state.filters,
            disponibility: 'all',
          };
          break;

        case 'type':
          filters = {
            ...state.filters,
            type: 'all',
          };
          break;

        case 'players':
          filters = {
            ...state.filters,
            players: 0,
          };
          break;

        case 'categories':
          filters = {
            ...state.filters,
            categories: state.filters.categories.filter((category) => (category.id.toString() !== action.value.toString())),
          };
          break;

        case 'games':
          filters = {
            ...state.filters,
            games: state.filters.games.filter((game) => (game.id.toString() !== action.value.toString())),
          };
          break;

        default:
      }

      return {
        ...state,
        filters,
        tags,
      };
    }

    default:
      return state;
  }
};

export default reducer;
