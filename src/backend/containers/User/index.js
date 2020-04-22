import { connect } from 'react-redux';
import User from 'src/backend/components/User';

import { fetchAllUsers } from 'src/actions/user';

const mapStateToProps = (state) => ({
  users: state.user.allUsers,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllUsers: (params) => {
    dispatch(fetchAllUsers(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(User);
