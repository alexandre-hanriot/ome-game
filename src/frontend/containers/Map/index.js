import { connect } from 'react-redux';
import Map from 'src/frontend/components/Map';

import { mapLoaded, changeBounds, changeZoom, saveResults } from 'src/actions/map';

const mapStateToProps = (state) => ({
  mapIsLoaded: state.map.mapLoaded,
  zoom: state.map.zoom,
  bounds: state.map.bounds,
  mapCoordinates: state.map.coordinates,
  defaultZoom: state.map.defaultZoom,
  defaultCoordinates: state.map.defaultCoordinates,
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
  mapLoaded: () => {
    dispatch(mapLoaded());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
