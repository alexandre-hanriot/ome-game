import axios from 'axios';

import { SEND_MESSAGE, setField } from 'src/actions/contact';
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

      axios.post('ec2-34-205-156-142.compute-1.amazonaws.com/contact', {
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

    default:
      next(action);
  }
};

export default contactMiddleware;
