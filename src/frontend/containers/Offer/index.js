import { connect } from 'react-redux';
import Offer from 'src/frontend/components/Offer';

import {
  fetchGames,
  fetchGamesCategories,
  changeFieldGame,
  changeFieldPlayers,
  changeFilterDisponibility,
  changeFilterType,
  changeFilterCategories,
  changeFilterGames,
  changeFilterPlayers,
} from 'src/actions/map';

const mapStateToProps = (state) => ({
  results: state.map.results,
  games: state.map.games,
  gamesCategories: state.map.gamesCategories,
  fieldGame: state.map.fieldGame,
  fieldPlayers: state.map.fieldPlayers,
  filterLastUpdate: state.map.filterLastUpdate,
  filterDisponibility: state.map.filterDisponibility,
  filterType: state.map.filterType,
  filterCategories: state.map.filterCategories,
  filterGames: state.map.filterGames,
  filterPlayers: state.map.filterPlayers,
});

const mapDispatchToProps = (dispatch) => ({
  fetchGames: () => {
    dispatch(fetchGames());
  },
  fetchGamesCategories: () => {
    dispatch(fetchGamesCategories());
  },
  changeFilterDisponibility: (value) => {
    dispatch(changeFilterDisponibility(value));
  },
  changeFilterType: (value) => {
    dispatch(changeFilterType(value));
  },
  changeFilterCategories: (value) => {
    dispatch(changeFilterCategories(value));
  },
  changeFieldGame: (value) => {
    dispatch(changeFieldGame(value));
  },
  changeFieldPlayers: (value) => {
    dispatch(changeFieldPlayers(value));
  },
  changeFilterGames: () => {
    dispatch(changeFilterGames());
  },
  changeFilterPlayers: () => {
    dispatch(changeFilterPlayers());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Offer);
