import axios from 'axios';

import { SEND_MESSAGE, setField, SEND_CAPTCHA } from 'src/actions/contact';
import { showAlert } from 'src/actions/global';

const contactMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      const {
        firstname,
        lastname,
        email,
        message,
      } = store.getState().contact;

      axios.post('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/contact', {
        firstname,
        lastname,
        email,
        message,
      })
        .then((response) => {
          store.dispatch(setField('firstname', ''));
          store.dispatch(setField('lastname', ''));
          store.dispatch(setField('email', ''));
          store.dispatch(setField('message', ''));
          store.dispatch(setField('legalMentions', false));
          store.dispatch(setField('isLoad', false));
          store.dispatch(showAlert('Votre message à été envoyé avec succès'));
        })
        .catch((error) => {
          store.dispatch(showAlert('Erreur lors de l\'envoi du message', false));
          console.error(error);
        });

      next(action);
      break;
    }

    case SEND_CAPTCHA: {

      console.log(action.value);
      axios.post('https://www.google.com/recaptcha/api/siteverify', {
        secret: '6LeDgfAUAAAAAHR_59OTzbuTHeQi6aJah3EiO3Rm',
        response: action.value,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });

      next(action);
      break;
    }


    default:
      next(action);
  }
};

export default contactMiddleware;
