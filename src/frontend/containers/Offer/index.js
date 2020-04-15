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
  removeFilter,
  updateResults,
} from 'src/actions/map';

const mapStateToProps = (state) => ({
  results: state.map.results,
  games: state.map.games,
  gamesCategories: state.map.gamesCategories,
  fieldGame: state.map.fieldGame,
  fieldPlayers: state.map.fieldPlayers,
  filters: state.map.filters,
  tags: state.map.tags,
});

const mapDispatchToProps = (dispatch) => ({
  fetchGames: () => {
    dispatch(fetchGames());
  },
  fetchGamesCategories: () => {
    dispatch(fetchGamesCategories());
  },
  changeFilterDisponibility: (value, name) => {
    dispatch(changeFilterDisponibility(value, name));
  },
  changeFilterType: (value, name) => {
    dispatch(changeFilterType(value, name));
  },
  changeFilterCategories: (value, name) => {
    dispatch(changeFilterCategories(value, name));
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
  removeFilter: (name, value) => {
    dispatch(removeFilter(name, value));
  },
  updateResults: () => {
    dispatch(updateResults());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Offer);
