import { connect } from 'react-redux';
import { showModal } from 'src/actions/global';
import Offers from 'src/frontend/components/Account/Offers';

import { fetchOffers, saveOfferId } from 'src/actions/offers';

const mapStateToProps = (state) => ({
  data: state.offers.allOffers,
  showModal: state.global.showModal,
  showAlert: state.global.showAlert,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOffers: () => {
    dispatch(fetchOffers());
  },
  saveOfferId: (id) => {
    dispatch(saveOfferId(id));
  },
  displayModal: (name) => {
    dispatch(showModal(name));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Offers);
