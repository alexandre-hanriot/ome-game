import {
  SUBMIT_LOGIN,
  logUser,
  changeLoginError,
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
          store.dispatch(changeLoginError(''));
        })
        .catch((error) => {
          // handle error
          if (error.response.status === 404) {
            store.dispatch(changeLoginError('l\'utilisateur n\'a pas été trouvé'));
          }
          else if (error.response.status === 400) {
            store.dispatch(changeLoginError('veuillez renseignez tous les champs obligatoires'));
          }
          else if (error.response.status === 401) {
            store.dispatch(changeLoginError('les identifiants sont invalides'));
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
