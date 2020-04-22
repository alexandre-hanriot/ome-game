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
} from 'src/actions/user';
import { showAlert, showModal } from 'src/actions/global';
import axios from 'axios';


const userMiddleware = (store) => (next) => (action) => {
  const { rememberMe, userData } = store.getState().user;
  switch (action.type) {
    case SUBMIT_LOGIN: {
      const { email, password } = store.getState().user;
      axios({
        method: 'post',
        url: 'http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/login',
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
          if (rememberMe) {
            localStorage.setItem('xsrfToken', data.xsrfToken);
          }
          sessionStorage.setItem('xsrfToken', data.xsrfToken);
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
          'x-xsrf-token': sessionStorage.getItem('xsrfToken'),
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
        url: `http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/${userData.user.id}/password`,
        data: {
          oldPassword: userData.user.old_password,
          newPassword: userData.user.new_password,
          userId: userData.user.id,
        },
        withCredentials: true,
        headers: {
          'x-xsrf-token': sessionStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          store.dispatch(saveProfilUpdate(response.data));
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
      // TODO : limit 4 (wait Steph)
      axios.get('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users', {
        params: {
          orderby: 'id',
          sortby: 'DESC',
          status: ['0', '1'],
        },
      })
        .then((response) => {
          // TODO - temp
          const users = response.data.filter((data, index) => index < 4);
          store.dispatch(saveUsers(users));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case IS_TOKEN_EXIST: {
      if (localStorage.getItem('xsrfToken') !== null || sessionStorage.getItem('xsrfToken') !== null) {
        if (localStorage.getItem('xsrfToken') !== null) {
          sessionStorage.setItem('xsrfToken', localStorage.getItem('xsrfToken'));
        }

        axios({
          method: 'get',
          url: 'http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/authenticate',
          withCredentials: true,
          headers: {
            'x-xsrf-token': sessionStorage.getItem('xsrfToken'),
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
              xsrfToken: sessionStorage.getItem('xsrfToken'),
            };
            store.dispatch(logUser(data));
          })
          .catch((error) => {
            console.warn(error);
          });
      }
      next(action);
      break;
    }
    case LOG_OUT: {
      axios.get('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/logout', {
        withCredentials: true,
      })
        .then((response) => {
          localStorage.clear();
          sessionStorage.clear();
          store.dispatch(clearUser());
        })
        .catch((error) => {
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
