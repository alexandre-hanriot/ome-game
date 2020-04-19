export const GET_GAME_CATEGORIES = 'GET_GAME_CATEGORIES';
export const GET_GAMES = 'GET_GAMES';
export const SAVE_GAME_CATEGORIES = 'SAVE_GAME_CATEGORIES';
export const SET_CATEGORIES_IS_LOAD = 'SET_CATEGORIES_IS_LOAD';
export const SET_GAME_IS_LOAD = 'SET_GAME_IS_LOAD';
export const SAVE_GAMES = 'SAVE_GAMES';

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

export const getGames = () => ({
  type: GET_GAMES,
});
