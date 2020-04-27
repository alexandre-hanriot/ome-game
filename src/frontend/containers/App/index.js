import { connect } from 'react-redux';
import App from 'src/frontend/components/App';
import { isTokenExist } from 'src/actions/user';
import { redirectTo, setAppLoading } from 'src/actions/global';

const mapStateToProps = (state) => ({
  isLogged: state.user.isLogged,
  showAlert: state.global.showAlert,
  isError: state.global.isError,
  redirectTo: state.global.redirectTo,
  rememberMe: state.user.rememberMe,
  appIsLoad: state.global.appIsLoad,
});

const mapDispatchToProps = (dispatch) => ({
  setRedirectTo: (url) => {
    dispatch(redirectTo(url));
  },
  isTokenExist: () => {
    dispatch(isTokenExist());
  },
  setAppLoading: (value) => {
    dispatch(setAppLoading(value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
