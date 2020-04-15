import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';

import Marker from './Marker';
import './map.scss';

const Map = ({
  mapRef,
  mapIsLoaded,
  defaultCoordinates,
  defaultZoom,
  bounds,
  zoom,
  mapLoaded,
  changeZoom,
  changeBounds,
  saveResults,
  fetchOffers,
  offers,
}) => {
  // format data for supercluster dependancy
  const points = offers.map((data) => ({
    type: 'Feature',
    properties: {
      cluster: false,
      ...data,
    },
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(data.longitude),
        parseFloat(data.latitude),
      ],
    },
  }));

  // load points and create clusters with supercluster dependancy
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 15 },
  });

  // Save results in state
  const handleChange = () => {
    if (mapIsLoaded) {
      const results = [];
      clusters.map((cluster) => {
        const { cluster: isCluster } = cluster.properties;

        if (isCluster) {
          supercluster.getLeaves(cluster.id, 20).map((clusterElement) => results.push(clusterElement.properties));
        }
        else {
          results.push(cluster.properties);
        }
      });
      saveResults(results);
    }
  };

  // when API is loaded
  const handleApiLoaded = (map) => {
    mapRef.current = map;
    map.setOptions({ maxZoom: 15 });
    mapLoaded();
    fetchOffers();
  };

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAAUPUp27VoZaXgYvRwLCjgn5cZjpRIWjs' }}
        defaultCenter={defaultCoordinates}
        defaultZoom={defaultZoom}
        yesIWantToUseGoogleMapApiInternals
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
      >
        {mapIsLoaded && (
          clusters.map((cluster) => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const { cluster: isCluster, id } = cluster.properties;
            const key = isCluster ? cluster.id : id;
            return (
              <Marker
                key={`map-cluster-${key}`}
                lat={latitude}
                lng={longitude}
                supercluster={supercluster}
                cluster={cluster}
                pointsLength={points.length}
                mapRef={mapRef}
              />
            );
          })
        )}
      </GoogleMapReact>
    </div>
  );
};

Map.propTypes = {
  defaultCoordinates: PropTypes.object.isRequired,
  defaultZoom: PropTypes.number.isRequired,
  mapRef: PropTypes.object.isRequired,
  mapIsLoaded: PropTypes.bool.isRequired,
  mapLoaded: PropTypes.func.isRequired,
  changeBounds: PropTypes.func.isRequired,
  changeZoom: PropTypes.func.isRequired,
  zoom: PropTypes.number.isRequired,
  bounds: PropTypes.array.isRequired,
  saveResults: PropTypes.func.isRequired,
  fetchOffers: PropTypes.func.isRequired,
  offers: PropTypes.array.isRequired,
};

export default Map;
