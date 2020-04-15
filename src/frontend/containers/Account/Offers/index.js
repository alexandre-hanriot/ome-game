import { connect } from 'react-redux';
import { fetchOffers } from 'src/actions/offers';
import Offers from 'src/frontend/components/Account/Offers';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  data: state.data.listOffers,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  fetchOffers: () => {
    dispatch(fetchOffers());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Offers);
