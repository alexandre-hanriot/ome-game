import { connect } from 'react-redux';
import Details from 'src/frontend/components/Account/Reservations/Details';

// import { showModal } from 'src/actions/global';
import { fetchOneReservation } from 'src/actions/reservations';


const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  data: state.reservations.oneReservation,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOneReservation: () => {
    dispatch(fetchOneReservation());
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Details);
