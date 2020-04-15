import { connect } from 'react-redux';
import { showModal } from 'src/actions/global';
import Account from 'src/frontend/components/Account';
import { fetchParamsReservations } from 'src/actions/reservations';
import { fetchParamsOffers } from 'src/actions/offers';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  showModal: state.global.showModal,
  showAlert: state.global.showAlert,
  data: state.data.listReservations,
  data2: state.data.listOffers,
  user: state.user.userData,
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account);
