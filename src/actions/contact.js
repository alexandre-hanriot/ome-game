export const SET_FIELD = 'SET_FIELD';

export const setField = (name, value) => ({
  type: SET_FIELD,
  name,
  value,
});
