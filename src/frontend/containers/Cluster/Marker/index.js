import { connect } from 'react-redux';
import Marker from 'src/frontend/components/Cluster/Marker';

import {
  changeCoordinates,
  changeZoom,
} from 'src/actions/map';

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
)(Marker);
