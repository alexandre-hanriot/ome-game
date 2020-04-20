import { connect } from 'react-redux';
import Offers from 'src/frontend/components/Account/Offers';

import { fetchOffers, changeOfferIsLoad } from 'src/actions/offers';

const mapStateToProps = (state) => ({
  data: state.offers.allOffers,
  offerIsLoad: state.offers.offerIsLoad,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOffers: () => {
    dispatch(fetchOffers());
  },
  changeOfferIsLoad: () => {
    dispatch(changeOfferIsLoad());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Offers);
