import { connect } from 'react-redux';
import { showModal, showAlert } from 'src/actions/global';
import Modal from 'src/frontend/components/Account/Modal';

import { deleteReservation } from 'src/actions/reservations';
import { deleteOffer } from 'src/actions/offers';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  showModal: state.global.showModal,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  displayModal: () => {
    dispatch(showModal());
  },
  displayAlert: (message, success) => {
    dispatch(showAlert(message, success));
  },

  deleteReservation: () => {
    dispatch(deleteReservation());
  },
  deleteOffer: () => {
    dispatch(deleteOffer());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);
