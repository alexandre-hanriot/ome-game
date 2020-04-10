/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';

import './login.scss';

const Login = () => (
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
    <Link className="login__link" to="">Mot de passe oublié ?</Link>
  </div>
);

export default Login;
