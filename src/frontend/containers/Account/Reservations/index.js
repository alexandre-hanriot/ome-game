import { connect } from 'react-redux';
import Reservation from 'src/frontend/components/Account/Reservations';

import { showModal } from 'src/actions/global';
import { fetchReservations } from 'src/actions/reservations';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  showModal: state.global.showModal,
  data: state.data.listReservations,
});

const mapDispatchToProps = (dispatch) => ({
  displayModal: (name) => {
    dispatch(showModal(name));
  },
  fetchReservations: () => {
    dispatch(fetchReservations());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reservation);
