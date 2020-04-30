import { connect } from 'react-redux';
import Home from 'src/frontend/components/Home';
import { changeFof } from 'src/actions/global';
import {
  changeCoordinates,
  changeZoom,
} from 'src/actions/map';

const mapStateToProps = (state) => ({
  isFof: state.global.isFof,
});

const mapDispatchToProps = (dispatch) => ({
  changeCoordinates: (lat, lng) => {
    dispatch(changeCoordinates(lat, lng));
  },
  changeZoom: (value) => {
    dispatch(changeZoom(value));
  },
  changeFof: () => {
    dispatch(changeFof());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
