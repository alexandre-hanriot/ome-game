import { connect } from 'react-redux';
import UserMenu from 'src/frontend/components/Header/UserMenu';

import { logOut } from 'src/actions/user';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => {
    dispatch(logOut());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserMenu);
