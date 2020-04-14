import {
  SUBMIT_LOGIN,
  logUser,
} from 'src/actions/user';
import { showAlert, showModal } from 'src/actions/global';
import axios from 'axios';

const authMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_LOGIN: {
      const { email, password } = store.getState().user;
      axios
        .post('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/login', {
          identifier: email,
          password,
        })
        .then((response) => {
          console.log(response);
          store.dispatch(logUser(response.data));
          store.dispatch(showAlert('vous êtes connecté', true));
          store.dispatch(showModal());
        })
        .catch((error) => {
          // handle error
          if (error.response.status === 404) {
            store.dispatch(showAlert('l\'utilisateur n\'a pas été trouvé', false));
          }
          else if (error.response.status === 500) {
            store.dispatch(showAlert('veuillez renseignez tous les champs obligatoires', false));
          }
          else if (error.response.status === 401) {
            store.dispatch(showAlert('les identifiants sont invalides', false));
          }
          console.warn(error.toJSON);
        });
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default authMiddleware;
