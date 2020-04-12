import { connect } from 'react-redux';
import Details from 'src/frontend/components/Offer/Details';

import { showAlert, showModal } from 'src/actions/global';

const mapStateToProps = (state) => ({
  showAlert: state.global.showAlert,
  showModal: state.global.showModal,
});

const mapDispatchToProps = (dispatch) => ({
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
)(Details);
