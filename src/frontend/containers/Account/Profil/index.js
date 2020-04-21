import { connect } from 'react-redux';
import Profil from 'src/frontend/components/Account/Profil';
import {
  changeProfilInput,
  submitProfilUpdate,
  submitProfilChangePassword,
  clearProfilPasswords,
} from 'src/actions/user';
import { showAlert } from 'src/actions/global';



const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  userData: state.user.userData,
});

const mapDispatchToProps = (dispatch) => ({
  changeProfilInput: (identifier, newValue) => {
    dispatch(changeProfilInput(identifier, newValue));
  },
  submitProfilUpdate: () => {
    dispatch(submitProfilUpdate());
  },
  submitProfilChangePassword: () => {
    dispatch(submitProfilChangePassword());
  },
  clearProfilPasswords: () => {
    dispatch(clearProfilPasswords());
  },
  displayAlert: (message, success) => {
    dispatch(showAlert(message, success));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profil);
