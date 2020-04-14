import { connect } from 'react-redux';
import Header from 'src/frontend/components/Header';

import { showMenu, showModal } from 'src/actions/global';

const mapStateToProps = (state) => ({
  showMenu: state.global.showMenu,
  showModal: state.global.showModal,
  pseudo: state.user.isLogged ? state.user.userData.username : null,
  isLogged: state.user.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  displayMenu: () => {
    dispatch(showMenu());
  },
  displayModal: (name) => {
    dispatch(showModal(name));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
