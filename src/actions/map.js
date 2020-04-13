export const SET_BOUNDS = 'SET_BOUNDS';
export const SET_ZOOM = 'SET_ZOOM';

export const changeBounds = (bounds) => ({
  type: SET_BOUNDS,
  bounds,
});

export const changeZoom = (zoom) => ({
  type: SET_ZOOM,
  zoom,
});
