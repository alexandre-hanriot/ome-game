import { connect } from 'react-redux';
import Search from 'src/frontend/components/Offer/Search';

import {
  changeCoordinates,
  changeZoom,
  fetchOffers,
  changeFieldGame,
  changeFieldPlayers,
  changeFilterDisponibility,
  changeFilterType,
  changeFilterCategories,
  changeFilterGames,
  changeFilterPlayers,
  removeFilter,
  changeFilterLoad,
  changeShowOptions,
} from 'src/actions/map';

const mapStateToProps = (state) => ({
  results: state.map.results,
  games: state.map.games,
  gamesCategories: state.map.gamesCategories,
  fieldGame: state.map.fieldGame,
  fieldPlayers: state.map.fieldPlayers,
  filters: state.map.filters,
  filtersIsLoad: state.map.filtersIsLoad,
  tags: state.map.tags,
  showOptions: state.map.showOptions,
});

const mapDispatchToProps = (dispatch) => ({
  changeCoordinates: (lat, lng) => {
    dispatch(changeCoordinates(lat, lng));
  },
  changeZoom: (value) => {
    dispatch(changeZoom(value));
  },
  fetchOffers: () => {
    dispatch(fetchOffers());
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
  changeFilterLoad: () => {
    dispatch(changeFilterLoad());
  },
  changeShowOptions: () => {
    dispatch(changeShowOptions());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
