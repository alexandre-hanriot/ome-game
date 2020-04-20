import {
  SUBMIT_LOGIN,
  logUser,
  changeLoginError,
  SUBMIT_PROFIL_UPDATE,
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
          store.dispatch(showAlert('Connexion effectuée avec succès', true));
          store.dispatch(showModal());
          store.dispatch(changeLoginError(''));
        })
        .catch((error) => {
          // handle error
          if (error.response.status === 404) {
            store.dispatch(changeLoginError('Les identifiants sont invalides'));
          }
          else if (error.response.status === 400) {
            store.dispatch(changeLoginError('Veuillez renseignez tous les champs obligatoires'));
          }
          else if (error.response.status === 401) {
            store.dispatch(changeLoginError('Les identifiants sont invalides'));
          }
          console.warn(error);
        });
      next(action);
      break;
    }
    case SUBMIT_PROFIL_UPDATE: {
      const { userData } = store.getState().user;
      axios
        .post('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/login', {
          status: '',
          picture: '',
          email: '',
          password: '',
          username: '',
          firstname: '',
          lastname: '',
          phone: null,
          adress: null,
          postal_code: '',
          city: '',
          gdpr_accepted_at: null,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          // handle error
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
