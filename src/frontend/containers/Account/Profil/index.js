import { connect } from 'react-redux';
import Profil from 'src/frontend/components/Account/Profil';
import {
  changeProfilInput,
  submitProfilUpdate,
  submitProfilChangePassword,
  clearProfilPasswords,
} from 'src/actions/user';
import { showAlert, showModal } from 'src/actions/global';

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  showModal: state.global.showModal,
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
  },
  displayModal: (name) => {
    dispatch(showModal(name));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profil);
