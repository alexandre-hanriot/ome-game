import { connect } from 'react-redux';
import { showModal, showAlert } from 'src/actions/global';
import { saveIdReservation, updateStatusReservation, updateValidateReservation, updateStatusFinishedReservation } from 'src/actions/reservations';
import { updateStatusOffer } from 'src/actions/offers';
import ModalRequest from 'src/frontend/components/Account/Offers/ModalRequest';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  showModal: state.global.showModal,
  urlId: state.global.modalParams.id,
  username: state.global.modalParams.username,
  allOffers: state.offers.allOffers,
  idReservation: state.reservations.idReservation,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  displayModal: () => {
    dispatch(showModal());
  },
  displayAlert: (message, success) => {
    dispatch(showAlert(message, success));
  },
  saveIdReservation: (id) => {
    dispatch(saveIdReservation(id));
  },

  updateStatusReservation: () => {
    dispatch(updateStatusReservation());
  },

  updateValidateReservation: () => {
    dispatch(updateValidateReservation());
  },

  updateStatusOffer: () => {
    dispatch(updateStatusOffer());
  },

  updateStatusFinishedReservation: () => {
    dispatch(updateStatusFinishedReservation());
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalRequest);
