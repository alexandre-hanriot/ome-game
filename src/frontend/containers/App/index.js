import { connect } from 'react-redux';
import App from 'src/frontend/components/App';
import { isTokenExist } from 'src/actions/user';
import { redirectTo } from 'src/actions/global';

const mapStateToProps = (state) => ({
  isLogged: state.user.isLogged,
  showAlert: state.global.showAlert,
  isError: state.global.isError,
  redirectTo: state.global.redirectTo,
});

const mapDispatchToProps = (dispatch) => ({
  setRedirectTo: (url) => {
    dispatch(redirectTo(url));
  },
  isTokenExist: () => {
    dispatch(isTokenExist());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
