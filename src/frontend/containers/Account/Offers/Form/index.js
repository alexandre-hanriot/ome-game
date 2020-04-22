import { connect } from 'react-redux';
import Form from 'src/frontend/components/Account/Offers/Form';

import {
  saveOfferId, getOffer, clearOffer, handleFormInput, handleAddOffer, handleModifyOffer, changeOfferIsLoad, setOfferSend,
} from 'src/actions/offers';

import {
  getGameCategories, getGames, changeCategoriesIsLoad, changeGameIsLoad, addGame, setNewGameField, handleFormInputGame,
} from 'src/actions/game';

import { showAlert } from 'src/actions/global';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  offer: state.offers.offer,
  categories: state.game.categories,
  games: state.game.games,
  gamesIsLoad: state.game.gamesIsLoad,
  categoriesIsLoad: state.game.categoriesIsLoad,
  newGameField: state.game.newGameField,
  game: state.game.game,
  offerSend: state.offers.offerSend,
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
  getGames: (params) => {
    dispatch(getGames(params));
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
  displayAlert: (message, success) => {
    dispatch(showAlert(message, success));
  },
  setOfferSend: (value) => {
    dispatch(setOfferSend(value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
