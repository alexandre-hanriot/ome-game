import { connect } from 'react-redux';
import { showModal } from '../../../../actions/reservations';
import Reservation from '../../../components/Account/Reservations';

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
)(Reservation);
