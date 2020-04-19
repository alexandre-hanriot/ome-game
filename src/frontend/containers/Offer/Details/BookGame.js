import { connect } from 'react-redux';
import BookGame from 'src/frontend/components/Offer/Details/BookGame';

import { showModal, showAlert } from 'src/actions/global';
import { addReservation } from 'src/actions/reservations';


const mapStateToProps = (state) => ({
  isLogged: state.user.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  displayModal: () => {
    dispatch(showModal());
  },
  displayAlert: (message, success) => {
    dispatch(showAlert(message, success));
  },
  addReservation: () => {
    dispatch(addReservation());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookGame);
