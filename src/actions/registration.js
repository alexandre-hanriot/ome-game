export const CHANGE_INPUT = 'CHANGE_INPUT';
export const SAVE_USER = 'SAVE_USER';
export const SUBMIT_REGISTRATION = 'SUBMIT_REGISTRATION';
export const CHANGE_REGISTRATION_ERROR = 'CHANGE_REGISTRATION_ERROR';
export const CHECK_LEGAL_MENTIONS = 'CHECK_LEGAL_MENTIONS';
export const CLEAR_MODAL_INPUTS = 'CLEAR_MODAL_INPUTS';

export const changeInput = (identifier, newValue) => ({
  type: CHANGE_INPUT,
  identifier,
  newValue,
});

export const saveUser = () => ({
  type: SAVE_USER,
});

export const submitRegistration = () => ({
  type: SUBMIT_REGISTRATION,
});

export const changeRegistrationError = (message = '') => ({
  type: CHANGE_REGISTRATION_ERROR,
  message,
});

export const checkLegalMentions = () => ({
  type: CHECK_LEGAL_MENTIONS,
});

export const clearModalInputs = () => ({
  type: CLEAR_MODAL_INPUTS,
});
