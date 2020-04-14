import React from 'react';
import PropTypes from 'prop-types';

import './marker.scss';

const Marker = ({
  lat, lng, supercluster, cluster, pointsLength, mapRef,
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
          mapRef.current.setZoom(expansionZoom);
          mapRef.current.panTo({ lat, lng });
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
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  supercluster: PropTypes.object.isRequired,
  cluster: PropTypes.object.isRequired,
  pointsLength: PropTypes.number.isRequired,
  mapRef: PropTypes.object.isRequired,
};

export default Marker;
