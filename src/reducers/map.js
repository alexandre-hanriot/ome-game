import {
  SET_BOUNDS, SET_ZOOM, SET_COORDINATES,
} from 'src/actions/map';

const initialState = {
  bounds: [],
  zoom: 6,
  coordinates: {
    lat: 46.227638,
    lng: 2.213749,
  },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default reducer;
