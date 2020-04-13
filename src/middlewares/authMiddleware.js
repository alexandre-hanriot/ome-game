import {
  SUBMIT_LOGIN,
  logUser,
} from 'src/actions/authenticate';
import { showAlert } from 'src/actions/global';
import axios from 'axios';

const authMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_LOGIN: {
      const { email, password } = store.getState();
      axios.post('http://localhost:3000/login', {
        identifier: email,
        password,
      })
        .then((response) => {
          store.dispatch(logUser(response.data));
        })
        .catch((error) => {
          // handle error
          if (error.status === 404) {
            showAlert('l\'utilisateur n\'a pas été trouvé', false);
          }
          else if (error.status === 500) {
            showAlert('veuillez renseignez tous les champs obligatoires', false);
          }
          else if (error.status === 401) {
            showAlert('les identifiants sont invalides', false);
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

export default authMiddleware;
