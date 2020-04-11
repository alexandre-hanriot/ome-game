/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import './login.scss';

const Login = ({ displayModal }) => {
  const handlePassword = () => {
    displayModal('forgotPassword');
  };

  return (
    <div className="login">
      <h1>Connexion</h1>
      <p className="login__text">Vous avez déjà un compte ? Connectez-vous ci-dessous.</p>
      <form className="login__form">
        <input type="text" placeholder="Adresse email" className="global-input" />
        <input type="password" placeholder="Mot de passe" className="global-input" />
        <label className="login__form__remember">
          <input type="checkbox" /> Se souvenir de moi
        </label>
        <button type="submit" className="global-button">Se connecter</button>
      </form>
      <button type="button" className="login__link" onClick={handlePassword}>Mot de passe oublié ?</button>
    </div>
  );
};

Login.propTypes = {
  displayModal: PropTypes.func.isRequired,
};

export default Login;
