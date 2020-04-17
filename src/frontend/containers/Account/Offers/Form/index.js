import { connect } from 'react-redux';
import {
  getOfferId, getOffer, clearOffer, handleFormInput,
} from 'src/actions/offers';
import {
  getGameCategories, getGames, changeCategoriesIsLoad, changeGameIsLoad,
} from 'src/actions/game';
import Form from 'src/frontend/components/Account/Offers/Form';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  offer: state.offers.offer,
  categories: state.game.categories,
  games: state.game.games,
  gamesIsLoad: state.game.gamesIsLoad,
  categoriesIsLoad: state.game.categoriesIsLoad,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  getOfferId: (slug) => {
    dispatch(getOfferId(slug));
  },
  getOffer: () => {
    dispatch(getOffer());
  },
  clearOffer: () => {
    dispatch(clearOffer());
  },
  handleFormInput: (identifier, newValue) => {
    dispatch(handleFormInput(identifier, newValue));
  },
  getGameCategories: () => {
    dispatch(getGameCategories());
  },
  getGames: () => {
    dispatch(getGames());
  },
  changeCategoriesIsLoad: () => {
    dispatch(changeCategoriesIsLoad());
  },
  changeGameIsLoad: () => {
    dispatch(changeGameIsLoad());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
