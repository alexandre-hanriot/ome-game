import {
  saveUser,
  SAVE_USER,
} from 'src/actions/registration';
import axios from 'axios';
import { showAlert, showModal } from 'src/actions/global';


const registrationMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    // waiting the route
    case SAVE_USER: {
      const {
        // TODO traitement de la confirmation du mot de passe
        email, password, pseudo,
      } = store.getState().registration;
      axios({
        method: 'post',
        url: 'http://localhost:3001/register',
        data: {
          identifier: email,
          password,
          pseudo,
        },
        withCredentials: true,
      })
        .then((response) => {
          store.dispatch(saveUser(response.data));
          showModal('');
          store.dispatch(showAlert('votre compte à été crée', true));
        })
        .catch((error) => {
          // handle error
          if (error.status === 500) {
            store.dispatch(showAlert('veuillez renseignez tous les champs obligatoires', false));
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
