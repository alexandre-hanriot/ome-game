export const GET_GAME_CATEGORIES = 'GET_GAME_CATEGORIES';
export const GET_GAMES = 'GET_GAMES';
export const SAVE_GAME_CATEGORIES = 'SAVE_GAME_CATEGORIES';
export const SET_CATEGORIES_IS_LOAD = 'SET_CATEGORIES_IS_LOAD';
export const SET_GAME_IS_LOAD = 'SET_GAME_IS_LOAD';
export const SAVE_GAMES = 'SAVE_GAMES';
export const ADD_GAME = 'ADD_GAME';
export const SET_NEW_GAME_FIELD = 'SET_NEW_GAME_FIELD';
export const HANDLE_FORM_INPUT_GAME = 'HANDLE_FORM_INPUT_GAME';
export const UPDATE_STATUS_GAME = 'UPDATE_STATUS_GAME';

export const getGameCategories = () => ({
  type: GET_GAME_CATEGORIES,
});

export const saveGameCategories = (categories) => ({
  type: SAVE_GAME_CATEGORIES,
  categories,
});

export const changeCategoriesIsLoad = () => ({
  type: SET_CATEGORIES_IS_LOAD,
});

export const changeGameIsLoad = () => ({
  type: SET_GAME_IS_LOAD,
});

export const saveGames = (games) => ({
  type: SAVE_GAMES,
  games,
});

export const getGames = (params = {}) => ({
  type: GET_GAMES,
  params,
});

export const addGame = () => ({
  type: ADD_GAME,
});

export const setNewGameField = (value) => ({
  type: SET_NEW_GAME_FIELD,
  value,
});

export const handleFormInputGame = (name, value) => ({
  type: HANDLE_FORM_INPUT_GAME,
  name,
  value,
});

export const updateStatusGame = (id, status) => ({
  type: UPDATE_STATUS_GAME,
  id,
  status,
});
