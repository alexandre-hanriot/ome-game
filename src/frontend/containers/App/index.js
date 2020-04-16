import { connect } from 'react-redux';
import App from 'src/frontend/components/App';


const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  isLogged: state.user.isLogged,
  showAlert: state.global.showAlert,
  isError: state.global.isError,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
