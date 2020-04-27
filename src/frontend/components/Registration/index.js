/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPasswordStrength from 'react-password-strength';
import PropTypes from 'prop-types';
import Loader from 'src/frontend/components/Loader';
import { labelClassname } from 'src/utils/selectors';
import './registration.scss';

const Registration = ({
  email, inputPassword, confirmPassword, pseudo, changeValue,
  submitRegistration, changeRegistrationError, errorMessage,
  isLegalMentionsChecked, checkLegalMentions, clearModalInputs, requestIsLoad,
}) => {
  useEffect(() => () => {
    clearModalInputs();
  }, []);
  let reactInputPassword = useRef(null);
  const handleChange = (identifier, newValue) => {
    changeValue(identifier, newValue);
  };
  const changeInput = (event) => {
    const identifier = event.target.name;
    const newValue = event.target.value;
    handleChange(identifier, newValue);
  };
  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    if (inputPassword === confirmPassword && inputPassword !== '' && confirmPassword !== '' && pseudo.length >= 3 && isLegalMentionsChecked) {
      submitRegistration();
      reactInputPassword.clear();
      changeValue('requestIsLoad', true);
    }
    if (inputPassword !== confirmPassword) {
      changeRegistrationError('La confirmation du mot de passe est incorrecte');
      reactInputPassword.clear();
    }
    if (email === '' || inputPassword === '' || confirmPassword === '' || pseudo === '') {
      changeRegistrationError('Veuillez renseigner tous les champs');
      reactInputPassword.clear();
    }
    if (pseudo.length < 3) {
      changeRegistrationError('Le pseudo doit contenir au moins 3 caractères');
      reactInputPassword.clear();
    }
    if (!isLegalMentionsChecked) {
      changeRegistrationError('Veuillez accepter les mentions légales');
      reactInputPassword.clear();
    }
  };
  return (
    <div className="registration">
      <h1>Inscription</h1>
      {errorMessage !== '' && (
        <div className="global-error">
          <p>{errorMessage}</p>
        </div>
      )}
      <p className="registration__text">Vous n'avez pas encore de compte ? Créez en un ci-dessous.</p>

      <div className="registration__container">
        <form className="registration__form" onSubmit={handleRegisterSubmit}>
          <label className={labelClassname(email)}>
            <input name="email" type="text" className="global-input" value={email} onChange={changeInput} />
            <span>Adresse email</span>
          </label>
          <label className={labelClassname(pseudo)}>
            <input name="pseudo" type="text" className="global-input" value={pseudo} onChange={changeInput} />
            <span>Pseudo</span>
          </label>
          <label className={labelClassname(inputPassword)}>
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
              }}
              changeCallback={({ password }) => {
                changeValue('password', password);
              }}
              defaultValue={inputPassword}
              // eslint-disable-next-line no-return-assign
              ref={(ref) => reactInputPassword = ref}
            />
            <span>Mot de passe</span>
          </label>
          <label className={labelClassname(confirmPassword)}>
            <input name="confirmPassword" type="password" className="global-input" value={confirmPassword} onChange={changeInput} />
            <span>Confirmer le mot de passe</span>
          </label>
          <label className="registration__form__legalmentions">
            <input name="confirmPassword" type="checkbox" onClick={checkLegalMentions} /> J'ai lu et j'accepte les <Link to="/mentions-legales" target="_blank" className="">mentions légales</Link>
          </label>
          {!requestIsLoad && <button type="submit" className="global-button">S'inscrire</button>}
          {requestIsLoad && <button type="button" className="global-button" disabled><Loader withMargin={false} /></button>}
        </form>

        <div className="registration__infos">
          <p>Le pseudo doit contenir au moins 3 caractères.</p>
          <p>Pour votre sécurité, nous vous conseillons
            de respecter les critères ci-dessous pour votre mot de passe :
          </p>
          <ul>
            <li>- 8 caractères minimum (obligatoire)</li>
            <li>- 1 lettre en minuscule minimum</li>
            <li>- 1 lettre en majuscule minimum</li>
            <li>- 1 chiffre minimum</li>
            <li>- 1 caractère spécial minimum</li>
          </ul>
          <p>
            Tous les champs sont obligatoires
          </p>
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
  changeValue: PropTypes.func.isRequired,
  submitRegistration: PropTypes.func.isRequired,
  changeRegistrationError: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  isLegalMentionsChecked: PropTypes.bool.isRequired,
  checkLegalMentions: PropTypes.func.isRequired,
  clearModalInputs: PropTypes.func.isRequired,
  requestIsLoad: PropTypes.bool.isRequired,
};

export default Registration;
