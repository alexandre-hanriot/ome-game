import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

import './map.scss';

const Marker = ({ children }) => children;
const Map = ({ zoom, lat, lng }) => {

  let hasMarker = true;

  if (lat === '' || lng === '' || typeof lat === 'undefined' || typeof lng === 'undefined' || lat === null || lng === null) {
    lat = '46.227638';
    lng = '2.213749';
    hasMarker = false;
  }

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyC8xGEr6OKx4X2CYbwZZTuJC11qOzs_CaE' }}
        center={{
          lat: Number(lat),
          lng: Number(lng),
        }}
        zoom={zoom}
      >
        {hasMarker && (
        <Marker
          lat={Number(lat)}
          lng={Number(lng)}
        >
          <i className="fas fa-map-marker-alt map__marker" />
        </Marker>
        )}
      </GoogleMapReact>
    </div>
  );
};

Map.propTypes = {
  zoom: PropTypes.number,
  lat: PropTypes.string,
  lng: PropTypes.string,
};

Map.defaultProps = {
  zoom: 5,
  lat: '46.227638',
  lng: '2.213749',
};

export default Map;
