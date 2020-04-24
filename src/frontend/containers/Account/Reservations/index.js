import { connect } from 'react-redux';
import Reservation from 'src/frontend/components/Account/Reservations';

import { showModal } from 'src/actions/global';
import {
  fetchReservations,
  saveIdReservation,
  changeReservationsLoad,
  clearReservations,
} from 'src/actions/reservations';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  showModal: state.global.showModal,
  data: state.reservations.allReservations,
  idReservation: state.reservations.idReservation,
  isReservationsLoad: state.reservations.isReservationsLoad,
});

const mapDispatchToProps = (dispatch) => ({
  displayModal: (name, params) => {
    dispatch(showModal(name, params));
  },
  fetchReservations: () => {
    dispatch(fetchReservations());
  },
  saveIdReservation: (id) => {
    dispatch(saveIdReservation(id));
  },
  changeReservationsLoad: () => {
    dispatch(changeReservationsLoad());
  },
  clearReservations: () => {
    dispatch(clearReservations());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reservation);
