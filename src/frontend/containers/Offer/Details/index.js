import { connect } from 'react-redux';
import Details from 'src/frontend/components/Offer/Details';

import { showAlert } from 'src/actions/global';

const mapStateToProps = (state) => ({
  showAlert: state.global.showAlert,
});

const mapDispatchToProps = (dispatch) => ({
  displayAlert: (message, success) => {
    dispatch(showAlert(message, success));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Details);
