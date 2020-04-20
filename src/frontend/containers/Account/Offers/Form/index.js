import { connect } from 'react-redux';
import Form from 'src/frontend/components/Account/Offers/Form';

import {
  saveOfferId, getOffer, clearOffer, handleFormInput, handleAddOffer, handleModifyOffer, changeOfferIsLoad,
} from 'src/actions/offers';

import {
  getGameCategories, getGames, changeCategoriesIsLoad, changeGameIsLoad, addGame, setNewGameField, handleFormInputGame,
} from 'src/actions/game';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  offer: state.offers.offer,
  categories: state.game.categories,
  games: state.game.games,
  gamesIsLoad: state.game.gamesIsLoad,
  categoriesIsLoad: state.game.categoriesIsLoad,
  newGameField: state.game.newGameField,
  game: state.game.game,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  saveOfferId: (slug) => {
    dispatch(saveOfferId(slug));
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
  handleAddOffer: () => {
    dispatch(handleAddOffer());
  },
  handleModifyOffer: () => {
    dispatch(handleModifyOffer());
  },
  addGame: () => {
    dispatch(addGame());
  },
  changeOfferIsLoad: () => {
    dispatch(changeOfferIsLoad());
  },
  setNewGameField: (value) => {
    dispatch(setNewGameField(value));
  },
  handleFormInputGame: (name, value) => {
    dispatch(handleFormInputGame(name, value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
