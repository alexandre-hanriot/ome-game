import { connect } from 'react-redux';
import { showModal } from 'src/actions/global';
import { changeInput } from 'src/actions/registration';
import Registration from 'src/frontend/components/Registration';

const mapStateToProps = (state) => ({
  email: state.registration.email,
  inputPassword: state.registration.password,
  pseudo: state.registration.pseudo,
  confirmPassword: state.registration.confirmPassword,
  showAlert: state.global.showAlert,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  displayModal: () => {
    dispatch(showModal());
  },
  changeValue: (identifier, newValue) => {
    dispatch(changeInput(identifier, newValue));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
