import { connect } from 'react-redux';
import Details from 'src/frontend/components/Offer/Details';

import {
  showAlert,
  showModal,
} from 'src/actions/global';

import {
  getOfferId,
  getOffer,
  changeOfferIsLoad,
  clearOffer,
} from 'src/actions/offers';

import {
  addFavorite,
} from 'src/actions/favorites';

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
  getOfferId: (id) => {
    dispatch(getOfferId(id));
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Details);
