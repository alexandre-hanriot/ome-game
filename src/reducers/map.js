import {
  SET_BOUNDS, SET_ZOOM,
} from 'src/actions/map';

const initialState = {
  bounds: [],
  zoom: 6,
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

    default:
      return state;
  }
};

export default reducer;
