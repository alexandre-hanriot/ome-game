/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import ReactPasswordStrength from 'react-password-strength';
import PropTypes from 'prop-types';
import Alert from 'src/frontend/containers/Alert';

import './registration.scss';

const Registration = ({
  email, inputPassword, confirmPassword, pseudo, showAlert, changeValue,
}) => {
  const handleChange = (identifier, newValue) => {
    changeValue(identifier, newValue);
  };
  const changeInput = (event) => {
    const identifier = event.target.name;
    const newValue = event.target.value;
    handleChange(identifier, newValue);
  };
  return (
    <div className="registration">
      {showAlert && (<Alert />)}
      <h1>Inscription</h1>
      <p className="registration__text">Vous n'avez pas encore de compte ? Créez en un ci-dessous.</p>

      <div className="registration__container">
        <form className="registration__form">
          <input name="email" type="text" placeholder="Adresse email" className="global-input" value={email} onChange={changeInput} />
          <input name="pseudo" type="text" placeholder="Pseudo" className="global-input" value={pseudo} onChange={changeInput} />
          <ReactPasswordStrength
            style={{
              border: 'none',
              fontSize: '1em',
            }}
            minLength={8}
            minScore={2}
            inputProps={{
              name: 'password',
              autoComplete: 'off',
              className: 'global-input',
              placeholder: 'Mot de passe',
              value: { inputPassword },
            }}
            changeCallback={({ password }) => {
              changeValue('password', password);
            }}
          />
          <input name="confirmPassword" type="password" placeholder="Confirmer le mot de passe" className="global-input" value={confirmPassword} onChange={changeInput} />
          <label className="registration__form__legalmentions">
            <input name="confirmPassword" type="checkbox" /> J'ai lu et j'accepte les <Link to="/mentions-legales" target="_blank" className="">mentions légales</Link>
          </label>
          <button type="submit" className="global-button">S'inscrire</button>
        </form>

        <div className="registration__infos">
          <p>Le pseudo doit contenir au moins 3 caractères.</p>
          <p>Pour votre sécurité, nous vous conseillons de respecter les critères ci-dessous pour votre mot de passe :</p>
          <ul>
            <li>- 8 caractères minimum (obligatoire)</li>
            <li>- 1 lettre en minuscule minimum</li>
            <li>- 1 lettre en majuscule minimum</li>
            <li>- 1 chiffre minimum</li>
            <li>- 1 caractère spécial minimum</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

Registration.propTypes = {
  email: PropTypes.string.isRequired,
  inputPassword: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  pseudo: PropTypes.string.isRequired,
  showAlert: PropTypes.bool.isRequired,
  changeValue: PropTypes.func.isRequired,
};

export default Registration;
