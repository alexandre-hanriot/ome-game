import { connect } from 'react-redux';
import { showModal } from 'src/actions/global';
import {
  changeInput, submitRegistration, changeRegistrationError, checkLegalMentions,
  clearModalInputs,
} from 'src/actions/registration';
import Registration from 'src/frontend/components/Registration';

const mapStateToProps = (state) => ({
  email: state.registration.email,
  inputPassword: state.registration.password,
  pseudo: state.registration.pseudo,
  confirmPassword: state.registration.confirmPassword,
  errorMessage: state.registration.errorMessage,
  isLegalMentionsChecked: state.registration.isLegalMentionsChecked,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  displayModal: () => {
    dispatch(showModal());
  },
  changeValue: (identifier, newValue) => {
    dispatch(changeInput(identifier, newValue));
  },
  submitRegistration: () => {
    dispatch(submitRegistration());
  },
  changeRegistrationError: (message) => {
    dispatch(changeRegistrationError(message));
  },
  checkLegalMentions: () => {
    dispatch(checkLegalMentions());
  },
  clearModalInputs: () => {
    dispatch(clearModalInputs());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
