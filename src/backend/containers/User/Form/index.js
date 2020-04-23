import { connect } from 'react-redux';
import Form from 'src/backend/components/User/Form';

import { fetchUser } from 'src/actions/user';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (id) => {
    dispatch(fetchUser(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
