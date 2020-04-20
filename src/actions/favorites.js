export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const SAVE_FAVORITES = 'SAVE_FAVORITES';
export const SAVE_ID_FAVORITE = 'SAVE_ID_FAVORITE';
export const SET_NOTIFY_FAVORITE = 'SET_NOTIFY_FAVORITE';
export const UPDATE_NOTIFY_FAVORITE = 'UPDATE_NOTIFY_FAVORITE';
export const UPDATE_NOTIFY_FAVORITES = 'UPDATE_NOTIFY_FAVORITES';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';
export const UPDATE_FAVORITES = 'UPDATE_FAVORITES';
export const ADD_FAVORITE = 'ADD_FAVORITE';


export const fetchFavorites = () => ({
  type: FETCH_FAVORITES,
});

export const saveFavorites = (favorites) => ({
  type: SAVE_FAVORITES,
  favorites,
});

export const saveIdFavorite = (idFavorite, notifyFavorite) => ({
  type: SAVE_ID_FAVORITE,
  idFavorite,
  notifyFavorite,
});

export const setNotifyFavorite = () => ({
  type: SET_NOTIFY_FAVORITE,
});

// serveur update notify
export const updateNotifyFavorite = () => ({
  type: UPDATE_NOTIFY_FAVORITE,
});

// state update oneavorite
export const updateNotifyFavorites = (id, notify) => ({
  type: UPDATE_NOTIFY_FAVORITES,
  id,
  notify,
});

export const deleteFavorite = (id) => ({
  type: DELETE_FAVORITE,
  id,
});

export const updateFavorites = (id) => ({
  type: UPDATE_FAVORITES,
  id,

export const addFavorite = () => ({
  type: ADD_FAVORITE,

});
