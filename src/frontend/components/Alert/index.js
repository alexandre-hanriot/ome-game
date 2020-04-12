import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './alert.scss';

const Alert = ({ message, success, displayAlert }) => {
  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        displayAlert();
      },
      5000,
    );
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  const isSuccess = classNames('alert__content__message', { 'alert__content__message--success': success });
  return (
    <div className="wrapper alert">
      <div className="alert__content">
        <p className={isSuccess}><span className="fas fa-chess-knight knight" /> {message} <span className="fas fa-chess-knight knight" /></p>
      </div>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired,
  displayAlert: PropTypes.func.isRequired,
};

export default Alert;
