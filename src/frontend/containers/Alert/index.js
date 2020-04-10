import { connect } from 'react-redux';
import Alert from 'src/frontend/components/Alert';
import { showAlert } from 'src/actions/global';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  message: state.global.alertMessage,
  success: state.global.alertSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  displayAlert: (message, success) => {
    dispatch(showAlert(message, success));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Alert);
