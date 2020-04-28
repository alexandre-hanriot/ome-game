import { connect } from 'react-redux';
import Home from 'src/backend/components/Home';

import { fetchAllOffers, updateStatusOffer2 } from 'src/actions/offers';
import { fetchAllUsers } from 'src/actions/user';
import { getGames, updateStatusGame } from 'src/actions/game';
import { fetchAllReservations } from 'src/actions/reservations';
import { setUpdate } from 'src/actions/global';

const mapStateToProps = (state) => ({
  offers: state.offers.allOffers,
  users: state.user.allUsers,
  games: state.game.games,
  reservations: state.reservations.allReservations,
  update: state.global.update,
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
  updateStatusOffer: (id, status) => {
    dispatch(updateStatusOffer2(id, status));
  },
  updateStatusGame: (id, status) => {
    dispatch(updateStatusGame(id, status));
  },
  setUpdate: () => {
    dispatch(setUpdate());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
