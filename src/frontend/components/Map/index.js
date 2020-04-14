import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';

import dataOffers from './data';
import './map.scss';

const Marker = ({ children }) => children;

const Map = ({
  mapRef,
  mapIsLoaded,
  defaultCoordinates,
  defaultZoom,
  bounds,
  zoom,
  mapCoordinates,
  mapLoaded,
  changeZoom,
  changeBounds,
  saveResults,
}) => {
  const points = dataOffers.map((data) => ({
    type: 'Feature',
    properties: {
      cluster: false,
      ...data,
    },
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(data.coordinates.lng),
        parseFloat(data.coordinates.lat),
      ],
    },
  }));

  // const mapRef = useRef();
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 15 },
  });

  const handleChange = () => {
    if (mapIsLoaded) {
      const results = [];
      clusters.map((cluster) => {
        const { cluster: isCluster } = cluster.properties;

        if (isCluster) {
          supercluster.getLeaves(cluster.id).map((clusterElement) => results.push(clusterElement.properties));
        }
        else {
          results.push(cluster.properties);
        }
      });
      saveResults(results);
    }
  };

  const handleApiLoaded = (map) => {
    mapRef.current = map;
    map.setOptions({ maxZoom: 15 });
    mapLoaded();
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
        onGoogleApiLoaded={({ map }) => handleApiLoaded(map)}
        onChange={({ zoom, bounds }) => {
          changeZoom(zoom);
          changeBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
          handleChange();
        }}
        defaultCenter={defaultCoordinates}
        defaultZoom={defaultZoom}
      >
        {mapIsLoaded && (clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          // console.log(cluster);
          const {
            cluster: isCluster,
            point_count: pointCount,
          } = cluster.properties;

          const size = isCluster ? `${10 + (pointCount / points.length) * 20}px` : '20px';

          if (isCluster) {
            // console.log(supercluster.getLeaves(cluster.id));

            // supercluster.getLeaves(cluster.id).map((cluster) => {
            //   console.log(cluster.properties);
            // });

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
                      15,
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

          // console.log(cluster.properties);

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
        }))}
      </GoogleMapReact>
    </div>
  );
};

Map.propTypes = {
  mapRef: PropTypes.object.isRequired,
  mapIsLoaded: PropTypes.bool.isRequired,
  mapLoaded: PropTypes.func.isRequired,
  changeBounds: PropTypes.func.isRequired,
  changeZoom: PropTypes.func.isRequired,
  zoom: PropTypes.number.isRequired,
  bounds: PropTypes.array.isRequired,
  mapCoordinates: PropTypes.object.isRequired,
  saveResults: PropTypes.func.isRequired,
};

export default Map;
