import { connect } from 'react-redux';
import Home from 'src/backend/components/Home';

import { fetchAllOffers } from 'src/actions/offers';
import { fetchAllUsers } from 'src/actions/user';
import { getGames } from 'src/actions/game';
import { fetchAllReservations } from 'src/actions/reservations';


const mapStateToProps = (state) => ({
  offers: state.offers.allOffers,
  users: state.user.allUsers,
  games: state.game.games,
  reservations: state.reservations.allReservations,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllOffers: (params) => {
    dispatch(fetchAllOffers(params));
  },
  fetchAllUsers: (params) => {
    dispatch(fetchAllUsers(params));
  },
  fetchAllGames: (params) => {
    dispatch(getGames(params));
  },
  fetchAllReservations: (params) => {
    dispatch(fetchAllReservations(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
