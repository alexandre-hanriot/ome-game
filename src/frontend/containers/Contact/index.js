import { connect } from 'react-redux';
import Contact from 'src/frontend/components/Contact';
import { displayAlert } from 'src/actions/global';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  showAlert: state.global.showAlert,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  displayAlert: () => {
    dispatch(displayAlert());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contact);
