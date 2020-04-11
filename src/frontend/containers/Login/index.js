import { connect } from 'react-redux';
import Login from 'src/frontend/components/Login';

import { showModal } from 'src/actions/global';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  displayModal: (name) => {
    dispatch(showModal(name));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
