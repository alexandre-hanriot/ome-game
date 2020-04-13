import { connect } from 'react-redux';
import Map from 'src/frontend/components/Map';

import { changeBounds, changeZoom, saveResults } from 'src/actions/map';

const mapStateToProps = (state) => ({
  zoom: state.map.zoom,
  bounds: state.map.bounds,
  coordinates: state.map.coordinates,
});

const mapDispatchToProps = (dispatch) => ({
  changeBounds: (value) => {
    dispatch(changeBounds(value));
  },
  changeZoom: (value) => {
    dispatch(changeZoom(value));
  },
  saveResults: (results) => {
    dispatch(saveResults(results));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
