export const SET_FIELD = 'SET_FIELD';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_CAPTCHA = 'SEND_CAPTCHA';

export const setField = (name, value) => ({
  type: SET_FIELD,
  name,
  value,
});

export const sendMessage = () => ({
  type: SEND_MESSAGE,
});

export const sendCaptcha = (value) => ({
  type: SEND_CAPTCHA,
  value,
});
