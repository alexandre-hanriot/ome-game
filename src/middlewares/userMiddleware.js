import {
  SUBMIT_LOGIN,
  logUser,
  changeLoginError,
  SUBMIT_PROFIL_UPDATE,
  saveProfilUpdate,
  SUBMIT_PROFIL_CHANGE_PASSWORD,
  FETCH_ALL_USERS,
  saveUsers,
  IS_TOKEN_EXIST,
  LOG_OUT,
  clearUser,
  FETCH_USER,
  setRequestIsLoad,
  saveUser,
  submitProfilUpdate,
  PROFIL_UPLOAD_IMAGE,
  setUploadData,
} from 'src/actions/user';

import { showAlert, showModal, setAppLoading } from 'src/actions/global';
import axios from 'axios';


const userMiddleware = (store) => (next) => (action) => {
  const { rememberMe, userData } = store.getState().user;
  switch (action.type) {
    case SUBMIT_LOGIN: {
      const { email, password } = store.getState().user;
      axios({
        method: 'post',
        url: 'https://ec2-54-167-103-17.compute-1.amazonaws.com:3000/login',
        data: {
          identifier: email,
          password,
          remember_me: rememberMe,
        },
        withCredentials: true,
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
          store.dispatch(setRequestIsLoad());
          localStorage.setItem('xsrfToken', data.xsrfToken);
          localStorage.setItem('rememberMe', rememberMe);
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
          store.dispatch(setRequestIsLoad());
          console.warn(error);
        });
      next(action);
      break;
    }
    case SUBMIT_PROFIL_UPDATE: {
      axios({
        method: 'put',
        url: `https://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/${userData.user.id}`,
        data: {
          userId: userData.user.id,
          status: userData.user.status,
          picture: userData.user.picture,
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
          'x-xsrf-token': localStorage.getItem('xsrfToken'),
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
      axios({
        method: 'put',
        url: `https://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/${userData.user.id}/password`,
        data: {
          oldPassword: userData.user.old_password,
          newPassword: userData.user.new_password,
          userId: userData.user.id,
        },
        withCredentials: true,
        headers: {
          'x-xsrf-token': localStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          store.dispatch(submitProfilUpdate(response.data));
        })
        .catch((error) => {
          if (error.response.status === 401) {
            store.dispatch(showAlert('l\'ancien mot de passe est incorrect', false));
          }
          console.warn(error);
        });
      next(action);
      break;
    }

    case FETCH_ALL_USERS: {
      axios.get('https://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users', {
        params: {
          ...action.params,
        },
      })
        .then((response) => {
          store.dispatch(saveUsers(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case IS_TOKEN_EXIST: {
      if (localStorage.getItem('xsrfToken') !== null) {
        axios({
          method: 'get',
          url: 'https://ec2-54-167-103-17.compute-1.amazonaws.com:3000/authenticate',
          withCredentials: true,
          headers: {
            'x-xsrf-token': localStorage.getItem('xsrfToken'),
          },
        })
          .then((response) => {
            const data = {
              user: {
                ...response.data,
                old_password: '',
                new_password: '',
                confirm_new_password: '',
              },
              xsrfToken: localStorage.getItem('xsrfToken'),
            };
            store.dispatch(logUser(data));
          })
          .catch((error) => {
            console.warn(error);
          })
          .finally(() => {
            store.dispatch(setAppLoading(true));
          });
      }
      next(action);
      break;
    }

    case LOG_OUT: {
      axios.get('https://ec2-54-167-103-17.compute-1.amazonaws.com:3000/logout', {
        withCredentials: true,
      })
        .then((response) => {
          localStorage.clear();
          store.dispatch(clearUser());
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    }

    case FETCH_USER: {
      axios({
        method: 'post',
        url: `https://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/${action.id}`,
      })
        .then((response) => {
          store.dispatch(saveUser(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    }

    case PROFIL_UPLOAD_IMAGE: {
      const { upload } = store.getState().user;
      if (upload.file !== '') {
        const data = new FormData();
        data.append('file', upload.file);

        axios({
          method: 'post',
          url: 'https://ec2-54-167-103-17.compute-1.amazonaws.com:3000/upload/users',
          withCredentials: true,
          data,
          headers: {
            'x-xsrf-token': localStorage.getItem('xsrfToken'),
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            store.dispatch(setUploadData('uploadPercentage', parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total), 10)));
          },
        })
          .then((response) => {
            store.dispatch(setUploadData('status', 2));
            store.dispatch(setUploadData('uploadedFile', response.data));
          })
          .catch((error) => {
            store.dispatch(setUploadData('status', 3));
            console.warn(error);
          });
      }
      next(action);
      break;
    }

    default:
      next(action);
  }
};

export default userMiddleware;
