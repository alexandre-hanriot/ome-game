import { connect } from 'react-redux';
import Header from 'src/frontend/components/Header';

import { showMenu } from 'src/actions/global';

const mapStateToProps = (state) => ({
  showMenu: state.global.showMenu,
});

const mapDispatchToProps = (dispatch) => ({
  displayMenu: () => {
    dispatch(showMenu());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
