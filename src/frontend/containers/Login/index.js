import { connect } from 'react-redux';
import Login from 'src/frontend/components/Login';

import { showModal } from 'src/actions/global';
import { changeInputOfLogin, submitLogin } from 'src/actions/authenticate';

const mapStateToProps = (state) => ({
  email: state.authenticate.email,
  password: state.authenticate.password,
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
