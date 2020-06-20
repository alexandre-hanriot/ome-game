import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';

import Marker from 'src/frontend/containers/Cluster/Marker';
import './cluster.scss';

const Cluster = ({
  changeCoordinates,
  coordinates,
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
  // load points and create clusters with supercluster dependancy
  const { clusters, supercluster } = useSupercluster({
    points: offers,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 15 },
  });

  // save results in state
  const handleChange = () => {
    if (mapIsLoaded) {
      const results = [];
      clusters.map((cluster) => {
        const { cluster: isCluster } = cluster.properties;
        if (isCluster) {
          supercluster.getLeaves(cluster.id, 20).map((clusterElement) => (
            results.push(clusterElement.properties)));
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
    map.setOptions({
      maxZoom: 15,
      styles: [
        {
          elementType: 'geometry',
          stylers: [
            {
              color: '#ebe3cd',
            },
          ],
        },
        {
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#523735',
            },
          ],
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#f5f1e6',
            },
          ],
        },
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#c9b2a6',
            },
          ],
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#dcd2be',
            },
          ],
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#ae9e90',
            },
          ],
        },
        {
          featureType: 'landscape.natural',
          elementType: 'geometry',
          stylers: [
            {
              color: '#dfd2ae',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [
            {
              color: '#dfd2ae',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#93817c',
            },
          ],
        },
        {
          featureType: 'poi.business',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#a5b076',
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#447530',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f5f1e6',
            },
          ],
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [
            {
              color: '#fdfcf8',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f8c967',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#e9bc62',
            },
          ],
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry',
          stylers: [
            {
              color: '#e98d58',
            },
          ],
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#db8555',
            },
          ],
        },
        {
          featureType: 'road.local',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#806b63',
            },
          ],
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [
            {
              color: '#dfd2ae',
            },
          ],
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#8f7d77',
            },
          ],
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#ebe3cd',
            },
          ],
        },
        {
          featureType: 'transit.station',
          elementType: 'geometry',
          stylers: [
            {
              color: '#dfd2ae',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#b9d3c2',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#92998d',
            },
          ],
        },
      ], // custom style map
    });
    mapLoaded();
    fetchOffers();
  };

  // update results when offers change
  useEffect(() => {
    if (mapIsLoaded) {
      changeCoordinates(coordinates.lat + 0.00001, coordinates.lng + 0.00001);
    }
  }, [offers]);

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyC8xGEr6OKx4X2CYbwZZTuJC11qOzs_CaE' }}
        defaultCenter={defaultCoordinates}
        defaultZoom={defaultZoom}
        center={coordinates}
        zoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => handleApiLoaded(map)}
        onChange={({ zoom, bounds, center }) => {
          changeZoom(zoom);
          changeBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
          changeCoordinates(center.lat, center.lng);
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
                pointsLength={offers.length}
              />
            );
          })
        )}
      </GoogleMapReact>
    </div>
  );
};

Cluster.propTypes = {
  changeCoordinates: PropTypes.func.isRequired,
  coordinates: PropTypes.object.isRequired,
  defaultCoordinates: PropTypes.object.isRequired,
  defaultZoom: PropTypes.number.isRequired,
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

export default Cluster;
