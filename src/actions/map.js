export const MAP_SET_MAP_LOADED = 'MAP_SET_MAP_LOADED';
export const MAP_SET_BOUNDS = 'MAP_SET_BOUNDS';
export const MAP_SET_ZOOM = 'MAP_SET_ZOOM';
export const MAP_SET_COORDINATES = 'MAP_SET_COORDINATES';
export const MAP_SET_RESULTS = 'MAP_SET_RESULTS';
export const MAP_FETCH_OFFERS = 'MAP_FETCH_OFFERS';
export const MAP_SAVE_OFFERS = 'MAP_SAVE_OFFERS';
export const MAP_FETCH_GAMES = 'MAP_FETCH_GAMES';
export const MAP_SAVE_GAMES = 'MAP_SAVE_GAMES';
export const MAP_FETCH_GAMES_CATEGORIES = 'MAP_FETCH_GAMES_CATEGORIES';
export const MAP_SAVE_GAMES_CATEGORIES = 'MAP_SAVE_GAMES_CATEGORIES';
export const MAP_SET_FIELD_GAME = 'MAP_SET_FIELD_GAME';
export const MAP_SET_FIELD_PLAYERS = 'MAP_SET_FIELD_PLAYERS';
export const MAP_SET_FIELD_PLACE = 'MAP_SET_FIELD_PLACE';
export const MAP_SET_FILTER_UPDATE = 'MAP_SET_FILTER_UPDATE';
export const MAP_SET_FILTER_DISPONIBILITY = 'MAP_SET_FILTER_DISPONIBILITY';
export const MAP_SET_FILTER_TYPE = 'MAP_SET_FILTER_TYPE';
export const MAP_SET_FILTER_CATEGORIES = 'MAP_SET_FILTER_CATEGORIES';
export const MAP_SET_FILTER_GAMES = 'MAP_SET_FILTER_GAMES';
export const MAP_SET_FILTER_PLAYERS = 'MAP_SET_FILTER_PLAYERS';
export const MAP_REMOVE_FILTER = 'MAP_REMOVE_FILTER';
export const MAP_SET_FILTER_LOAD = 'MAP_SET_FILTER_LOAD';
export const MAP_SET_REQUEST_LOAD = 'MAP_SET_REQUEST_LOAD';
export const MAP_SET_SHOW_OPTION = 'MAP_SET_SHOW_OPTION';

export const mapLoaded = () => ({
  type: MAP_SET_MAP_LOADED,
});

export const changeBounds = (bounds) => ({
  type: MAP_SET_BOUNDS,
  bounds,
});

export const changeZoom = (zoom) => ({
  type: MAP_SET_ZOOM,
  zoom,
});

export const changeCoordinates = (lat, lng) => ({
  type: MAP_SET_COORDINATES,
  lat,
  lng,
});

export const saveResults = (results) => ({
  type: MAP_SET_RESULTS,
  results,
});

export const fetchOffers = () => ({
  type: MAP_FETCH_OFFERS,
});

export const saveOffers = (offers) => ({
  type: MAP_SAVE_OFFERS,
  offers,
});

export const fetchGames = () => ({
  type: MAP_FETCH_GAMES,
});

export const saveGames = (games) => ({
  type: MAP_SAVE_GAMES,
  games,
});

export const fetchGamesCategories = () => ({
  type: MAP_FETCH_GAMES_CATEGORIES,
});

export const saveGamesCategories = (categories) => ({
  type: MAP_SAVE_GAMES_CATEGORIES,
  categories,
});

export const changeFieldPlace = (value) => ({
  type: MAP_SET_FIELD_PLACE,
  value,
});

export const changeFieldGame = (value) => ({
  type: MAP_SET_FIELD_GAME,
  value,
});

export const changeFieldPlayers = (value) => ({
  type: MAP_SET_FIELD_PLAYERS,
  value,
});

export const changeFilterDisponibility = (value, name) => ({
  type: MAP_SET_FILTER_DISPONIBILITY,
  value,
  name,
});

export const changeFilterType = (value, name) => ({
  type: MAP_SET_FILTER_TYPE,
  value,
  name,
});

export const changeFilterCategories = (value, name) => ({
  type: MAP_SET_FILTER_CATEGORIES,
  value,
  name,
});

export const changeFilterGames = () => ({
  type: MAP_SET_FILTER_GAMES,
});

export const changeFilterPlayers = () => ({
  type: MAP_SET_FILTER_PLAYERS,
});

export const removeFilter = (name, value) => ({
  type: MAP_REMOVE_FILTER,
  name,
  value,
});

export const changeFilterLoad = () => ({
  type: MAP_SET_FILTER_LOAD,
});

export const requestLoad = () => ({
  type: MAP_SET_REQUEST_LOAD,
});

export const changeShowOptions = () => ({
  type: MAP_SET_SHOW_OPTION,
});
