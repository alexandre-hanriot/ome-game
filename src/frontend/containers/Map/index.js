import { connect } from 'react-redux';
import Map from 'src/frontend/components/Map';

import { mapLoaded, changeBounds, changeZoom, saveResults, fetchOffers } from 'src/actions/map';

const mapStateToProps = (state) => ({
  mapIsLoaded: state.map.mapLoaded,
  zoom: state.map.zoom,
  bounds: state.map.bounds,
  coordinates: state.map.coordinates,
  defaultZoom: state.map.defaultZoom,
  defaultCoordinates: state.map.defaultCoordinates,
  offers: state.map.offers,
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
  fetchOffers: () => {
    dispatch(fetchOffers());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
