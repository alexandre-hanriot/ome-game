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
  setOfferInFavorite,
  setOfferInReservation,
  changeOfferDetailIsLoad,
} from 'src/actions/offers';

import {
  addFavorite,
  removeFavorite,
  checkOfferInFavorite,
  saveCurrentFavorite,
} from 'src/actions/favorites';

import {
  checkOfferInReservation,
} from 'src/actions/reservations';

const mapStateToProps = (state) => ({
  showAlert: state.global.showAlert,
  showModal: state.global.showModal,
  offerDetailIsLoad: state.offers.offerDetailIsLoad,
  offer: state.offers.offer,
  isLogged: state.user.isLogged,
  offerInFavorite: state.offers.offerInFavorite,
  offerInReservation: state.offers.offerInReservation,
  userId: state.user.userData.user.id,
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
  removeFavorite: () => {
    dispatch(removeFavorite());
  },
  checkOfferInFavorite: () => {
    dispatch(checkOfferInFavorite());
  },
  checkOfferInReservation: () => {
    dispatch(checkOfferInReservation());
  },
  setOfferInFavorite: (value) => {
    dispatch(setOfferInFavorite(value));
  },
  setOfferInReservation: (value) => {
    dispatch(setOfferInReservation(value));
  },
  saveCurrentFavorite: (value) => {
    dispatch(saveCurrentFavorite(value));
  },
  changeOfferDetailIsLoad: () => {
    dispatch(changeOfferDetailIsLoad());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Details);
