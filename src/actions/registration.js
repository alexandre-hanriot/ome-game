export const CHANGE_INPUT = 'CHANGE_INPUT';
export const SAVE_USER = 'SAVE_USER';

export const changeInput = (identifier, newValue) => ({
  type: CHANGE_INPUT,
  identifier,
  newValue,
});

export const saveUser = () => ({
  type: SAVE_USER,
});
