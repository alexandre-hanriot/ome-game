import { connect } from 'react-redux';
import Alert from 'src/frontend/components/Alert';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  message: state.global.message,
  success: state.global.success,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Alert);
