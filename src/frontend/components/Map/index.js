import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';

import data from './data';
import './map.scss';

const Marker = ({ children }) => children;

const Map = ({ bounds, zoom, coordinates, changeZoom, changeBounds }) => {

  const points = data.map((data) => ({
    type: 'Feature',
    properties: { cluster: false, id: data.id, location: data.location, name: data.name },
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(data.coordinates.lng),
        parseFloat(data.coordinates.lat),
      ],
    },
  }));

  const mapRef = useRef();

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 14 },
  });

  const handleApiLoaded = (map, maps) => {
    mapRef.current = map;
    map.setOptions({ maxZoom: 14 });
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAAUPUp27VoZaXgYvRwLCjgn5cZjpRIWjs' }}
        // defaultCenter={coordinates}
        // defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        // onGoogleApiLoaded={({ map }) => {
        //   mapRef.current = map;
        // }}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        onChange={({ zoom, bounds }) => {
          changeZoom(zoom);
          changeBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
        }}
        center={coordinates}
        zoom={zoom}
      >
        {console.clear()}
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          // console.log(cluster);
          const {
            cluster: isCluster,
            point_count: pointCount,
          } = cluster.properties;

          const size = isCluster ? `${10 + (pointCount / points.length) * 20}px` : '20px';

          if (isCluster) {
            // console.log(supercluster.getLeaves(cluster.id));

            supercluster.getLeaves(cluster.id).map((cluster) => {
              console.log(cluster);
            });

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
                      14,
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

          console.log(cluster);

          return (
            <Marker
              key={`cluser-offer-${cluster.properties.id}`}
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
  changeBounds: PropTypes.func.isRequired,
  changeZoom: PropTypes.func.isRequired,
  zoom: PropTypes.number.isRequired,
  bounds: PropTypes.array.isRequired,
  coordinates: PropTypes.object.isRequired,
};

export default Map;
