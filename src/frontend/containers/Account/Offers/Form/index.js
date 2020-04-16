import { connect } from 'react-redux';
import { getOfferId, getOffer } from 'src/actions/offers';
import Form from 'src/frontend/components/Account/Offers/Form';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  offer: state.offers.offer,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  getOfferId: (slug) => {
    dispatch(getOfferId(slug));
  },
  getOffer: () => {
    dispatch(getOffer());
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
