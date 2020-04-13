
const initialState = {
  email: 'toto@toto.toto',
  pseudo: 'toto',
  password: 'toto',
  confirmPassword: 'toto',
};

const RegistrationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default RegistrationReducer;
