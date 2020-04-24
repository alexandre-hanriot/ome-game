export const CHANGE_INPUT_OF_LOGIN = 'CHANGE_INPUT_OF_LOGIN';
export const LOG_USER = 'LOG_USER';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const CHANGE_LOGIN_ERROR = 'CHANGE_LOGIN_ERROR';
export const CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR';
export const LOG_OUT = 'LOG_OUT';
export const SET_REQUEST_LOAD = 'SET_REQUEST_LOAD';
export const CHANGE_PROFIL_INPUT = 'CHANGE_PROFIL_INPUT';
export const SUBMIT_PROFIL_UPDATE = 'SUBMIT_PROFIL_UPDATE';
export const SAVE_PROFIL_UPDATE = 'SAVE_PROFIL_UPDATE';
export const SUBMIT_PROFIL_CHANGE_PASSWORD = 'SUBMIT_PROFIL_CHANGE_PASSWORD';
export const SAVE_PROFIL_CHANGE_PASSWORD = 'SAVE_PROFIL_CHANGE_PASSWORD';
export const CLEAR_PROFIL_PASSWORDS = 'CLEAR_PROFIL_PASSWORDS';
export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';
export const SAVE_USERS = 'SAVE_USERS';
export const IS_TOKEN_EXIST = 'IS_TOKEN_EXIST';
export const CLEAR_USER = 'CLEAR_USER';
export const FETCH_USER = 'FETCH_USER';
export const SAVE_USER = 'SAVE_USER';

export const changeInputOfLogin = (identifier, newValue) => ({
  type: CHANGE_INPUT_OF_LOGIN,
  identifier,
  newValue,
});

export const logUser = (userData) => ({
  type: LOG_USER,
  userData,
});

export const submitLogin = () => ({
  type: SUBMIT_LOGIN,
});

export const changeLoginError = (message) => ({
  type: CHANGE_LOGIN_ERROR,
  message,
});

export const clearLoginError = () => ({
  type: CLEAR_LOGIN_ERROR,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const setRequestIsLoad = () => ({
  type: SET_REQUEST_LOAD,
});

export const changeProfilInput = (identifier, newValue) => ({
  type: CHANGE_PROFIL_INPUT,
  identifier,
  newValue,
});

export const submitProfilUpdate = () => ({
  type: SUBMIT_PROFIL_UPDATE,
});

export const saveProfilUpdate = (userData) => ({
  type: SAVE_PROFIL_UPDATE,
  userData,
});

export const submitProfilChangePassword = () => ({
  type: SUBMIT_PROFIL_CHANGE_PASSWORD,
});

export const clearProfilPasswords = () => ({
  type: CLEAR_PROFIL_PASSWORDS,
});

export const fetchAllUsers = (params = {}) => ({
  type: FETCH_ALL_USERS,
  params,
});

export const saveUsers = (users) => ({
  type: SAVE_USERS,
  users,
});

export const isTokenExist = () => ({
  type: IS_TOKEN_EXIST,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const fetchUser = (id) => ({
  type: FETCH_USER,
  id,
});

export const saveUser = (user) => ({
  type: SAVE_USER,
  user,
});
