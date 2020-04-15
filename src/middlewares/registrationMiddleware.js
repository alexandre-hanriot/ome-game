import {
  saveUser,
  SUBMIT_REGISTRATION, changeRegistrationError,
} from 'src/actions/registration';
import axios from 'axios';
import { showAlert, showModal } from 'src/actions/global';


const registrationMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    // waiting the route
    case SUBMIT_REGISTRATION: {
      const {
        // TODO traitement de la confirmation du mot de passe, style global pour les erreurs
        email, password, pseudo,
      } = store.getState().registration;

      axios.post('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users', {
        email,
        password,
        username: pseudo,
      })
        .then((response) => {
          store.dispatch(saveUser(response.data));
          store.dispatch(showModal(''));
          store.dispatch(showAlert('votre compte à été crée', true));
        })
        .catch((error) => {
          // handle error
          if (error.response.status === 400) {
            store.dispatch(changeRegistrationError(`${error.response.data.error}`, false));
          }
          if (error.response.status === 409) {
            store.dispatch(changeRegistrationError(`${error.response.data.error}`, false));
          }
          console.warn(error);
        });
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default registrationMiddleware;
