import { connect } from 'react-redux';
import Home from 'src/backend/components/Home';

import {
  fetchAllOffers,
} from 'src/actions/offers';

const mapStateToProps = (state) => ({
  offers: state.offers.allOffers,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllOffers: (params) => {
    dispatch(fetchAllOffers(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
