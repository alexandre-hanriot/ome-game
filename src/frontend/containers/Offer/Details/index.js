import { connect } from 'react-redux';
import Details from 'src/frontend/components/Offer/Details';

import {
  showAlert,
  showModal,
} from 'src/actions/global';

import {
  saveOfferId,
  getOffer,
  changeOfferIsLoad,
  clearOffer,
} from 'src/actions/offers';

import {
  addFavorite,
  checkOfferInFavorite,
} from 'src/actions/favorites';

import {
  checkOfferInReservation,
} from 'src/actions/reservations';

const mapStateToProps = (state) => ({
  showAlert: state.global.showAlert,
  showModal: state.global.showModal,
  offerIsLoad: state.offers.offerIsLoad,
  offer: state.offers.offer,
  isLogged: state.user.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  displayAlert: (message, success) => {
    dispatch(showAlert(message, success));
  },
  displayModal: (name) => {
    dispatch(showModal(name));
  },
  saveOfferId: (id) => {
    dispatch(saveOfferId(id));
  },
  getOffer: () => {
    dispatch(getOffer());
  },
  changeOfferIsLoad: () => {
    dispatch(changeOfferIsLoad());
  },
  clearOffer: () => {
    dispatch(clearOffer());
  },
  addFavorite: () => {
    dispatch(addFavorite());
  },
  checkOfferInFavorite: () => {
    dispatch(checkOfferInFavorite());
  },
  checkOfferInReservation: () => {
    dispatch(checkOfferInReservation());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Details);
