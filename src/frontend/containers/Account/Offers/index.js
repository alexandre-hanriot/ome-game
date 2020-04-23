import { connect } from 'react-redux';
import { showModal } from 'src/actions/global';
import Offers from 'src/frontend/components/Account/Offers';

import { fetchOffers, saveOfferId, changeOfferIsLoad } from 'src/actions/offers';
import { saveIdReservation } from 'src/actions/reservations';

const mapStateToProps = (state) => ({
  data: state.offers.allOffers,
  showModal: state.global.showModal,
  showAlert: state.global.showAlert,
  statusOfferReservation: state.offers.statusOfferReservation,
  offerIsLoad: state.offers.offerIsLoad,
});

const mapDispatchToProps = (dispatch) => ({
  displayModal: (name) => {
    dispatch(showModal(name));
  },
  fetchOffers: () => {
    dispatch(fetchOffers());
  },
  saveOfferId: (id) => {
    dispatch(saveOfferId(id));
  },
  saveIdReservation: (id) => {
    dispatch(saveIdReservation(id));
  },
  changeOfferIsLoad: () => {
    dispatch(changeOfferIsLoad());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Offers);
