import { connect } from 'react-redux';
import Header from 'src/frontend/components/Header';

import { showMenu, showModal } from 'src/actions/global';

const mapStateToProps = (state) => ({
  showMenu: state.global.showMenu,
  showModal: state.global.showModal,
  pseudo: state.user.isLogged ? state.user.userData.user.username : null,
  isLogged: state.user.isLogged,
  user: state.user.userData,
});

const mapDispatchToProps = (dispatch) => ({
  displayMenu: (name) => {
    dispatch(showMenu(name));
  },
  displayModal: (name) => {
    dispatch(showModal(name));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
