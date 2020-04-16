import { connect } from 'react-redux';
import NotFound from 'src/frontend/components/NotFound';

import { changeIsError } from 'src/actions/global';

const mapStateToProps = (state) => ({
  isError: state.global.isError,
});

const mapDispatchToProps = (dispatch) => ({
  changeIsError: () => {
    dispatch(changeIsError());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotFound);
