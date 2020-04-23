import axios from 'axios';

import { SEND_MESSAGE, setField } from 'src/actions/contact';

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
          console.log('send');
          store.dispatch(setField('firstname', ''));
          store.dispatch(setField('lastname', ''));
          store.dispatch(setField('email', ''));
          store.dispatch(setField('message', ''));
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
