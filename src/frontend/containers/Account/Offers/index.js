import { connect } from 'react-redux';
import { showModal } from 'src/actions/global';
import { fetchOffers, getOfferId } from 'src/actions/offers';
import Offers from 'src/frontend/components/Account/Offers';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  data: state.offers.allOffers,
  showModal: state.global.showModal,
  showAlert: state.global.showAlert,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  fetchOffers: () => {
    dispatch(fetchOffers());
  },
  getOfferId: (id) => {
    dispatch(getOfferId(id));
  },
  displayModal: (name) => {
    dispatch(showModal(name));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Offers);
