import { connect } from 'react-redux';
import Games from 'src/backend/components/Games';
import {
  getGames,
  getGameCategories,
  gamesOn,
  gamesOff,
  adminArchiveGame,
  adminRestoreGame,
  changeGameIsLoad,
} from 'src/actions/game';

const mapStateToProps = (state) => ({
  games: state.game.games,
  categories: state.game.categories,
  isDeletedGames: state.game.isDeletedGames,
  gamesIsLoad: state.game.gamesIsLoad,
});

const mapDispatchToProps = (dispatch) => ({
  getGames: () => {
    dispatch(getGames());
  },
  getGameCategories: () => {
    dispatch(getGameCategories());
  },
  gamesOn: () => {
    dispatch(gamesOn());
  },
  gamesOff: () => {
    dispatch(gamesOff());
  },
  adminArchiveGame: (gameId) => {
    dispatch(adminArchiveGame(gameId));
  },
  adminRestoreGame: (gameId) => {
    dispatch(adminRestoreGame(gameId));
  },
  changeGameIsLoad: () => {
    dispatch(changeGameIsLoad());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Games);
