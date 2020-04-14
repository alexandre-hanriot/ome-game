import { connect } from 'react-redux';
import Offer from 'src/frontend/components/Offer';

import { fetchGames } from 'src/actions/map';

const mapStateToProps = (state) => ({
  results: state.map.results,
  games: state.map.games,
});

const mapDispatchToProps = (dispatch) => ({
  fetchGames: () => {
    dispatch(fetchGames());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Offer);
