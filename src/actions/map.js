export const SET_MAP_LOADED = 'SET_MAP_LOADED';
export const SET_BOUNDS = 'SET_BOUNDS';
export const SET_ZOOM = 'SET_ZOOM';
export const SET_COORDINATES = 'SET_COORDINATES';
export const SET_RESULTS = 'SET_RESULTS';
export const FETCH_OFFERS = 'FETCH_OFFERS';
export const SAVE_OFFERS = 'SAVE_OFFERS';
export const FETCH_GAMES = 'FETCH_GAMES';
export const SAVE_GAMES = 'SAVE_GAMES';
export const FETCH_GAMES_CATEGORIES = 'FETCH_GAMES_CATEGORIES';
export const SAVE_GAMES_CATEGORIES = 'SAVE_GAMES_CATEGORIES';
export const SET_FIELD_GAME = 'SET_FIELD_GAME';
export const SET_FIELD_PLAYERS = 'SET_FIELD_PLAYERS';
export const SET_FILTER_UPDATE = 'SET_FILTER_UPDATE';
export const SET_FILTER_DISPONIBILITY = 'SET_FILTER_DISPONIBILITY';
export const SET_FILTER_TYPE = 'SET_FILTER_TYPE';
export const SET_FILTER_CATEGORIES = 'SET_FILTER_CATEGORIES';
export const SET_FILTER_GAMES = 'SET_FILTER_GAMES';
export const SET_FILTER_PLAYERS = 'SET_FILTER_PLAYERS';
export const REMOVE_FILTER = 'REMOVE_FILTER';
export const UPDATE_RESULTS = 'UPDATE_RESULTS';

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

export const fetchGamesCategories = () => ({
  type: FETCH_GAMES_CATEGORIES,
});

export const saveGamesCategories = (categories) => ({
  type: SAVE_GAMES_CATEGORIES,
  categories,
});

export const changeFieldGame = (value) => ({
  type: SET_FIELD_GAME,
  value,
});

export const changeFieldPlayers = (value) => ({
  type: SET_FIELD_PLAYERS,
  value,
});

export const changeFilterDisponibility = (value, name) => ({
  type: SET_FILTER_DISPONIBILITY,
  value,
  name,
});

export const changeFilterType = (value, name) => ({
  type: SET_FILTER_TYPE,
  value,
  name,
});

export const changeFilterCategories = (value, name) => ({
  type: SET_FILTER_CATEGORIES,
  value,
  name,
});

export const changeFilterGames = () => ({
  type: SET_FILTER_GAMES,
});

export const changeFilterPlayers = () => ({
  type: SET_FILTER_PLAYERS,
});

export const removeFilter = (name, value) => ({
  type: REMOVE_FILTER,
  name,
  value,
});

export const updateResults = () => ({
  type: UPDATE_RESULTS,
});
