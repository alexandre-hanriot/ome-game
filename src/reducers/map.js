import {
  MAP_SET_MAP_LOADED,
  MAP_SET_BOUNDS,
  MAP_SET_ZOOM,
  MAP_SET_COORDINATES,
  MAP_SET_RESULTS,
  MAP_SAVE_OFFERS,
  MAP_SAVE_GAMES,
  MAP_SAVE_GAMES_CATEGORIES,
  MAP_SET_FIELD_GAME,
  MAP_SET_FIELD_PLAYERS,
  MAP_SET_FILTER_DISPONIBILITY,
  MAP_SET_FILTER_TYPE,
  MAP_SET_FILTER_CATEGORIES,
  MAP_SET_FILTER_GAMES,
  MAP_SET_FILTER_PLAYERS,
  MAP_REMOVE_FILTER,
  MAP_SET_FILTER_LOAD,
  MAP_SET_REQUEST_LOAD,
  MAP_SET_SHOW_OPTION,
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
  filtersIsLoad: false,
  requestsLoad: 0,
  showOptions: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case MAP_SET_MAP_LOADED:
      return {
        ...state,
        mapLoaded: true,
      };

    case MAP_SET_BOUNDS:
      return {
        ...state,
        bounds: action.bounds,
      };

    case MAP_SET_ZOOM:
      return {
        ...state,
        zoom: action.zoom,
      };

    case MAP_SET_COORDINATES:
      return {
        ...state,
        coordinates: {
          lat: action.lat,
          lng: action.lng,
        },
      };

    case MAP_SET_RESULTS:
      return {
        ...state,
        results: action.results,
      };

    case MAP_SAVE_OFFERS:
      return {
        ...state,
        offers: action.offers,
      };

    case MAP_SAVE_GAMES:
      return {
        ...state,
        games: action.games,
      };

    case MAP_SAVE_GAMES_CATEGORIES:
      return {
        ...state,
        gamesCategories: action.categories,
      };

    case MAP_SET_FIELD_GAME:
      return {
        ...state,
        fieldGame: action.value,
      };

    case MAP_SET_FIELD_PLAYERS:
      return {
        ...state,
        fieldPlayers: action.value,
      };

    case MAP_SET_FILTER_DISPONIBILITY: {
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

    case MAP_SET_FILTER_TYPE: {
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

    case MAP_SET_FILTER_CATEGORIES: {
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

    case MAP_SET_FILTER_GAMES: {
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

    case MAP_SET_FILTER_PLAYERS: {
      if (Number.isNaN(Number(state.fieldPlayers))) {
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

    case MAP_REMOVE_FILTER: {
      const tags = state.tags.filter(
        (tag) => (tag.type !== action.name || tag.value.toString() !== action.value.toString()),
      );
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
            categories: state.filters.categories.filter(
              (category) => (category.id.toString() !== action.value.toString()),
            ),
          };
          break;

        case 'games':
          filters = {
            ...state.filters,
            games: state.filters.games.filter(
              (game) => (game.toString() !== action.value.toString()),
            ),
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

    case MAP_SET_FILTER_LOAD:
      return {
        ...state,
        filtersIsLoad: !state.filtersIsLoad,
      };

    case MAP_SET_REQUEST_LOAD:
      return {
        ...state,
        requestsLoad: state.requestsLoad + 1,
      };

    case MAP_SET_SHOW_OPTION:
      return {
        ...state,
        showOptions: !state.showOptions,
      };

    default:
      return state;
  }
};

export default reducer;
