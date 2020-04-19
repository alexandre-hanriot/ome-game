import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

import './map.scss';

const Marker = ({ children }) => children;
const Map = ({ lat, lng }) => {
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAAUPUp27VoZaXgYvRwLCjgn5cZjpRIWjs' }}
        defaultCenter={{
          lat: Number(lat),
          lng: Number(lng),
        }}
        defaultZoom={13}
      >
        <Marker
          lat={Number(lat)}
          lng={Number(lng)}
        >
          <i className="fas fa-map-marker-alt map__marker" />
        </Marker>
      </GoogleMapReact>
    </div>
  );
};

export default Map;
