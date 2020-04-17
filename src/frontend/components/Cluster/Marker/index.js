import React from 'react';
import PropTypes from 'prop-types';

import './marker.scss';

const Marker = ({
  changeCoordinates,
  changeZoom,
  lat,
  lng,
  supercluster,
  cluster,
  pointsLength,
}) => {
  const {
    cluster: isCluster,
    point_count: pointCount,
  } = cluster.properties;

  const size = isCluster ? `${20 + ((pointCount / pointsLength) * 20)}px` : '30px';
  return (
    <>
      {isCluster && (
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
          changeCoordinates(lat, lng);
          changeZoom(expansionZoom);

          const timeout = setTimeout(() => {
            changeCoordinates(lat + 0.00001, lng + 0.00001);
            clearTimeout(timeout);
          }, 1000);
        }}
      >
        {pointCount}
      </div>
      )}

      {!isCluster && (
      <div
        className="cluster-marker"
        style={{
          width: size,
          height: size,
        }}
      >
        1
      </div>
      )}
    </>
  );
};

Marker.propTypes = {
  changeCoordinates: PropTypes.func.isRequired,
  changeZoom: PropTypes.func.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  supercluster: PropTypes.object.isRequired,
  cluster: PropTypes.object.isRequired,
  pointsLength: PropTypes.number.isRequired,
};

export default Marker;
