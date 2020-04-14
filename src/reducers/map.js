import {
  SET_MAP_LOADED, SET_BOUNDS, SET_ZOOM, SET_COORDINATES, SET_RESULTS, SAVE_OFFERS, SAVE_GAMES,
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

    default:
      return state;
  }
};

export default reducer;
