import { connect } from 'react-redux';
import Login from 'src/frontend/components/Login';

import { showModal, showAlert } from 'src/actions/global';
import {
  changeInputOfLogin, submitLogin, changeLoginError, clearLoginError,
} from 'src/actions/user';

const mapStateToProps = (state) => ({
  email: state.user.email,
  password: state.user.password,
  showAlert: state.global.showAlert,
  loginError: state.user.loginError,
});

const mapDispatchToProps = (dispatch) => ({
  displayModal: (name) => {
    dispatch(showModal(name));
  },
  changeValue: (identifier, newValue) => {
    dispatch(changeInputOfLogin(identifier, newValue));
  },
  submitLogin: () => {
    dispatch(submitLogin());
  },
  displayAlert: (message, success) => {
    dispatch(showAlert(message, success));
  },
  changeLoginError: (message) => {
    dispatch(changeLoginError(message));
  },
  clearLoginError: () => {
    dispatch(clearLoginError());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
