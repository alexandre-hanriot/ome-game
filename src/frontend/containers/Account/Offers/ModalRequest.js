import { connect } from 'react-redux';
import { showModal, showAlert } from 'src/actions/global';
import { saveIdReservation, updateStatusReservation } from 'src/actions/reservations';
import ModalRequest from 'src/frontend/components/Account/Offers/ModalRequest';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  showModal: state.global.showModal,
  urlId: state.offers.urlId,
  allOffers: state.offers.allOffers,
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

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalRequest);
