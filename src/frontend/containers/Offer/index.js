import { connect } from 'react-redux';
import Offer from 'src/frontend/components/Offer';

import { changeCoordinates, changeZoom } from 'src/actions/map';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  changeCoordinates: (lat, lng) => {
    dispatch(changeCoordinates(lat, lng));
  },
  changeZoom: (value) => {
    dispatch(changeZoom(value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Offer);
