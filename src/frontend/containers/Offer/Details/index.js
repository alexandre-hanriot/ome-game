import { connect } from 'react-redux';
import Details from 'src/frontend/components/Offer/Details';

import { displayAlert } from 'src/actions/global';

const mapStateToProps = (state) => ({
  showAlert: state.global.showAlert,
});

const mapDispatchToProps = (dispatch) => ({
  displayAlert: () => {
    dispatch(displayAlert());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Details);
