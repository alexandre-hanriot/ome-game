import React from 'react';
import PropTypes from 'prop-types';
import './alert.scss';

const Alert = ({ message, success }) => (
  <div className="wrapper alert">
    <div className="alert__message">
      <p>Cette offre à bien été ajouté aux favoris !</p>
    </div>
  </div>
);

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired,
};

export default Alert;
