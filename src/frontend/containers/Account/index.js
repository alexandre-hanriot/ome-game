import { connect } from 'react-redux';
import { showModal } from 'src/actions/reservations';
import Account from 'src/frontend/components/Account';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  showModal: state.reservations.showModal,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  displayModal: () => {
    dispatch(showModal());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account);
