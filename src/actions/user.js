export const CHANGE_INPUT_OF_LOGIN = 'CHANGE_INPUT_OF_LOGIN';
export const LOG_USER = 'LOG_USER';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const CHANGE_LOGIN_ERROR = 'CHANGE_LOGIN_ERROR';
export const CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR';

export const changeInputOfLogin = (identifier, newValue) => ({
  type: CHANGE_INPUT_OF_LOGIN,
  inputIdentifier: identifier,
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
