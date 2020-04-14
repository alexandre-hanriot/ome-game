export const SET_MAP_LOADED = 'SET_MAP_LOADED';
export const SET_BOUNDS = 'SET_BOUNDS';
export const SET_ZOOM = 'SET_ZOOM';
export const SET_COORDINATES = 'SET_COORDINATES';
export const SET_RESULTS = 'SET_RESULTS';
export const FETCH_OFFERS = 'FETCH_OFFERS';
export const SAVE_OFFERS = 'SAVE_OFFERS';
export const FETCH_GAMES = 'FETCH_GAMES';
export const SAVE_GAMES = 'SAVE_GAMES';

export const mapLoaded = () => ({
  type: SET_MAP_LOADED,
});

export const changeBounds = (bounds) => ({
  type: SET_BOUNDS,
  bounds,
});

export const changeZoom = (zoom) => ({
  type: SET_ZOOM,
  zoom,
});

export const changeCoordinates = (lat, lng) => ({
  type: SET_COORDINATES,
  lat,
  lng,
});

export const saveResults = (results) => ({
  type: SET_RESULTS,
  results,
});

export const fetchOffers = () => ({
  type: FETCH_OFFERS,
});

export const saveOffers = (offers) => ({
  type: SAVE_OFFERS,
  offers,
});

export const fetchGames = () => ({
  type: FETCH_GAMES,
});

export const saveGames = (games) => ({
  type: SAVE_GAMES,
  games,
});
