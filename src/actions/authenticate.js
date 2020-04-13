export const CHANGE_INPUT_OF_LOGIN = 'CHANGE_INPUT_OF_LOGIN';
export const LOG_USER = 'LOG_USER';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';

export const changeInputOfLogin = (identifier, newValue) => ({
  type: CHANGE_INPUT_OF_LOGIN,
  inputIdentifier: identifier,
  newValue,
});

export const logUser = () => ({
  type: LOG_USER,
});

export const submitLogin = () => ({
  type: SUBMIT_LOGIN,
});
