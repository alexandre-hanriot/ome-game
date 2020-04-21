import {
  SUBMIT_LOGIN,
  logUser,
  changeLoginError,
  SUBMIT_PROFIL_UPDATE,
  saveProfilUpdate,
  SUBMIT_PROFIL_CHANGE_PASSWORD,
} from 'src/actions/user';
import { showAlert, showModal } from 'src/actions/global';
import axios from 'axios';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_LOGIN: {
      const { email, password, rememberMe } = store.getState().user;
      axios({
        method: 'post',
        url: 'http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/login',
        data: {
          identifier: email,
          password,
          remember_me: rememberMe,
        },
        withCredentials: true,
        headers: {
          'x-xsrf-token': rememberMe ? localStorage.getItem('xsrfToken') : sessionStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          const data = {
            ...response.data,
            user: {
              ...response.data.user,
              old_password: '',
              new_password: '',
              confirm_new_password: '',
            },
          };
          store.dispatch(logUser(data));
          store.dispatch(showAlert('Connexion effectuée avec succès', true));
          store.dispatch(showModal());
          store.dispatch(changeLoginError(''));
          if (rememberMe) {
            localStorage.setItem('userId', data.user.id);
            localStorage.setItem('xsrfToken', data.xsrfToken);
          }
          else if (rememberMe === false) {
            sessionStorage.setItem('userId', data.user.id);
            sessionStorage.setItem('xsrfToken', data.xsrfToken);
          }
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
      const { userData, rememberMe } = store.getState().user;
      axios({
        method: 'put',
        url: `http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/${userData.user.id}`,
        data: {
          userId: userData.user.id,
          status: userData.user.status,
          picture: '',
          display_name: userData.user.display_name,
          email: userData.user.email,
          username: userData.user.username,
          firstname: userData.user.firstname,
          lastname: userData.user.lastname,
          phone: userData.user.phone,
          address: userData.user.address,
          postal_code: userData.user.postal_code,
          city: userData.user.city,
          gdpr_accepted_at: userData.user.gdpr_accepted_at,
        },
        withCredentials: true,
        headers: {
          'x-xsrf-token': rememberMe ? localStorage.getItem('xsrfToken') : sessionStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          store.dispatch(saveProfilUpdate(response.data));
          store.dispatch(showAlert('vos informations ont été mis à jour', true));
        })
        .catch((error) => {
          // handle error
          console.warn(error);
        });
      next(action);
      break;
    }
    case SUBMIT_PROFIL_CHANGE_PASSWORD: {
      const { userData, rememberMe } = store.getState().user;
      axios({
        method: 'put',
        url: `http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/${userData.user.id}/password`,
        data: {
          oldPassword: userData.user.old_password,
          newPassword: userData.user.new_password,
          userId: userData.user.id,
        },
        withCredentials: true,
        headers: {
          'x-xsrf-token': rememberMe ? localStorage.getItem('xsrfToken') : sessionStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          store.dispatch(saveProfilUpdate(response.data));
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

export default userMiddleware;
