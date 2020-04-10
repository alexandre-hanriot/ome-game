import React from 'react';
import PropTypes from 'prop-types';
import Login from 'src/frontend/components/Login';
import Registration from 'src/frontend/components/Registration';
import classNames from 'classnames';

const Authentification = ({ showModal, displayModal }) => {
  const handleLogin = () => {
    displayModal('login');
  };
  const handleRegistration = () => {
    displayModal('registration');
  };

  const loginClass = classNames('authentification__nav__item', { 'authentification__nav__item--active': showModal === 'login' });
  const registrationClass = classNames('authentification__nav__item', { 'authentification__nav__item--active': showModal === 'registration' });

  return (
    <>
      <nav className="authentification__nav">
        <button type="button" className={loginClass} onClick={handleLogin}>Connexion</button>
        <button type="button" className={registrationClass} onClick={handleRegistration}>Inscription</button>
      </nav>

      {showModal === 'passwordForget' && (<Login />)}
      {showModal === 'login' && (<Login />)}
      {showModal === 'registration' && (<Registration />)}
    </>
  );
};

Authentification.propTypes = {
  showModal: PropTypes.string.isRequired,
  displayModal: PropTypes.func.isRequired,
};

export default Authentification;
