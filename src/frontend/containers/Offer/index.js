import { connect } from 'react-redux';
import Offer from 'src/frontend/components/Offer';

import {
  fetchGames,
  fetchGamesCategories,
} from 'src/actions/map';

const mapStateToProps = (state) => ({
  requestsLoad: state.map.requestsLoad,
});

const mapDispatchToProps = (dispatch) => ({
  fetchGames: () => {
    dispatch(fetchGames());
  },
  fetchGamesCategories: () => {
    dispatch(fetchGamesCategories());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Offer);
