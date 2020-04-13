import { connect } from 'react-redux';
import Map from 'src/frontend/components/Map';

import { changeBounds, changeZoom } from 'src/actions/map';

const mapStateToProps = (state) => ({
  zoom: state.map.zoom,
  bounds: state.map.bounds,
});

const mapDispatchToProps = (dispatch) => ({
  changeBounds: (value) => {
    dispatch(changeBounds(value));
  },
  changeZoom: (value) => {
    dispatch(changeZoom(value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
