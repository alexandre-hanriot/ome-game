import { connect } from 'react-redux';
import Games from 'src/backend/components/Games';
import {
  getGames,
  getGameCategories,
  gamesOn,
  gamesOff,
} from 'src/actions/game';

const mapStateToProps = (state) => ({
  games: state.game.games,
  categories: state.game.categories,
  isDeletedGames: state.game.isDeletedGames,
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Games);
