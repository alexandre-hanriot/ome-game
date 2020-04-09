import { connect } from 'react-redux';
import Header from 'src/frontend/components/Header';

import { handleMenu } from 'src/actions/header';

const mapStateToProps = (state) => ({
  menuOpen: state.header.menuOpen,
});

const mapDispatchToProps = (dispatch) => ({
  handleMenu: () => {
    dispatch(handleMenu());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
