import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './alert.scss';

const Alert = ({ message, success }) => {
  const isSuccess = classNames('alert__content__message', { 'alert__content__message--success': success });
  return (
    <div className="wrapper alert">
      <div className="alert__content">
        <p className={isSuccess}>{message}</p>
      </div>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired,
};

export default Alert;
