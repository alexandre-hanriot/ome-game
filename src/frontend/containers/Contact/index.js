import { connect } from 'react-redux';
import Contact from 'src/frontend/components/Contact';

import { showAlert } from 'src/actions/global';
import { setField } from 'src/actions/contact';

const mapStateToProps = (state) => ({
  showAlert: state.global.showAlert,
  name: state.contact.name,
  forename: state.contact.forename,
  email: state.contact.email,
  message: state.contact.message,
});

const mapDispatchToProps = (dispatch) => ({
  displayAlert: (message, success) => {
    dispatch(showAlert(message, success));
  },
  setField: (name, value) => {
    dispatch(setField(name, value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contact);
