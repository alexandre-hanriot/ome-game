import { connect } from 'react-redux';
import App from 'src/frontend/components/App';

import { redirectTo } from 'src/actions/global';

const mapStateToProps = (state) => ({
  isLogged: state.user.isLogged,
  showAlert: state.global.showAlert,
  isError: state.global.isError,
  redirectTo: state.global.redirectTo,
  rememberMe: state.user.remember_me,
});

const mapDispatchToProps = (dispatch) => ({
  setRedirectTo: (url) => {
    dispatch(redirectTo(url));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
