import {
  SUBMIT_LOGIN,
  logUser,
} from 'src/actions/authenticate';
import axios from 'axios';

const authMiddleware = (store) => (next) => (action) => {
  // console.log('On a intercepté une action dans authMiddleware', action);

  switch (action.type) {
    case SUBMIT_LOGIN: {
      const { email, password } = store.getState();

      // envoi d'une requête POST vers le serveur d'authentification
      // on fournit des informations sous forme d'objet
      axios.post('http://localhost:3001/login', {
        email,
        password,
      })
        .then((response) => {
          store.dispatch(logUser(response.data));
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
