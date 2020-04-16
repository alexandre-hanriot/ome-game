import { connect } from 'react-redux';
import { showModal } from 'src/actions/global';
import Account from 'src/frontend/components/Account';
import { fetchParamsReservations } from 'src/actions/reservations';
import { fetchParamsOffers } from 'src/actions/offers';
import { fetchFavorites } from 'src/actions/favorites';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  showModal: state.global.showModal,
  showAlert: state.global.showAlert,
  reservations: state.reservations.allReservations,
  offers: state.offers.allOffers,
  user: state.user.userData,
  favorites: state.favorites.allFavorites,
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account);
