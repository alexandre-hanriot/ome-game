import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';

import data from './data';
import './map.scss';

const Marker = ({ children }) => children;

const Map = ({ defaultCenter, defaultZoom, bounds, zoom, changeZoom, changeBounds }) => {

  const points = data.map((crime) => ({
    type: 'Feature',
    properties: { cluster: false, crimeId: crime.id, category: crime.category },
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(crime.location.longitude),
        parseFloat(crime.location.latitude),
      ],
    },
  }));

  const mapRef = useRef();

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAAUPUp27VoZaXgYvRwLCjgn5cZjpRIWjs' }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
          changeZoom(zoom);
          changeBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
        }}
      >
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount,
          } = cluster.properties;

          const size = isCluster ? `${10 + (pointCount / points.length) * 20}px` : '20px';

          if (isCluster) {
            // console.log(supercluster.getLeaves(cluster.id)); // voir 10 enfants
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                lat={latitude}
                lng={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: size,
                    height: size,
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20,
                    );
                    mapRef.current.setZoom(expansionZoom);
                    mapRef.current.panTo({ lat: latitude, lng: longitude });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`crime-${cluster.properties.crimeId}`}
              lat={latitude}
              lng={longitude}
            >
              <div
                className="cluster-marker"
                style={{
                  width: size,
                  height: size,
                }}
              >
                1
              </div>
            </Marker>
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

Map.propTypes = {
  defaultZoom: PropTypes.number,
  defaultCenter: PropTypes.object,
  changeBounds: PropTypes.func.isRequired,
  changeZoom: PropTypes.func.isRequired,
  zoom: PropTypes.number.isRequired,
  bounds: PropTypes.array.isRequired,
};

Map.defaultProps = {
  defaultCenter: {
    lat: 46.227638,
    lng: 2.213749,
  },
  defaultZoom: 6,
};

export default Map;
