import { connect } from 'react-redux';
import Details from 'src/frontend/components/Account/Reservations/Details';

import { fetchUser, saveUser } from 'src/actions/user';

const mapStateToProps = (state) => ({
  reservation: state.global.modalParams.reservation,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (id) => {
    dispatch(fetchUser(id));
  },
  saveUser: (user) => {
    dispatch(saveUser(user));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Details);
