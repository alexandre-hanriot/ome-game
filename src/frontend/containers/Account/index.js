import { connect } from 'react-redux';
import { showModal } from 'src/actions/global';
import Account from 'src/frontend/components/Account';

import { setRequestIsLoad } from 'src/actions/user';
import { fetchParamsReservations } from 'src/actions/reservations';
import { fetchParamsOffers } from 'src/actions/offers';
import {
  fetchFavorites,
  saveIdFavorite,
  setNotifyFavorite,
  updateNotifyFavorite,
  deleteFavorite,
} from 'src/actions/favorites';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  showModal: state.global.showModal,
  showAlert: state.global.showAlert,
  reservations: state.reservations.allReservations,
  offers: state.offers.allOffers,
  user: state.user.userData,
  favorites: state.favorites.allFavorites,
  idFavorite: state.favorites.idFavorite,
  requestIsLoad: state.user.requestIsLoad,
  notifyfavorite: state.favorites.notifyfavorite,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  displayModal: (name) => {
    dispatch(showModal(name));
  },

  fetchParamsReservations: () => {
    dispatch(fetchParamsReservations());
  },
  fetchParamsOffers: () => {
    dispatch(fetchParamsOffers());
  },
  fetchFavorites: () => {
    dispatch(fetchFavorites());
  },
  saveIdFavorite: (id, notify) => {
    dispatch(saveIdFavorite(id, notify));
  },
  setRequestIsLoad: () => {
    dispatch(setRequestIsLoad());
  },
  setNotifyFavorite: () => {
    dispatch(setNotifyFavorite());
  },
  updateNotifyFavorite: () => {
    dispatch(updateNotifyFavorite());
  },

  deleteFavorite: () => {
    dispatch(deleteFavorite());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account);
