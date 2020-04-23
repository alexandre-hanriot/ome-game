import { connect } from 'react-redux';
import Contact from 'src/frontend/components/Contact';

import { showAlert } from 'src/actions/global';
import { setField, sendMessage } from 'src/actions/contact';

const mapStateToProps = (state) => ({
  showAlert: state.global.showAlert,
  lastname: state.contact.lastname,
  firstname: state.contact.firstname,
  email: state.contact.email,
  message: state.contact.message,
  legalMentions: state.contact.legalMentions,
});

const mapDispatchToProps = (dispatch) => ({
  displayAlert: (message, success) => {
    dispatch(showAlert(message, success));
  },
  setField: (name, value) => {
    dispatch(setField(name, value));
  },
  sendMessage: () => {
    dispatch(sendMessage());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contact);
