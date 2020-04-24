/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './login.scss';
import Loader from 'src/frontend/components/Loader';

// use Sanitize on inputs for increase security
const Login = ({
  displayModal,
  changeValue,
  email,
  password,
  submitLogin,
  loginError,
  clearLoginError,
  rememberMe,
  requestIsLoad,
  setRequestIsLoad,
}) => {
  useEffect(() => () => {
    clearLoginError();
  }, []);
  const handlePassword = () => {
    displayModal('forgotPassword');
  };
  const handleChange = (identifier, newValue) => {
    changeValue(identifier, newValue);
  };
  const changeInput = (event) => {
    // eslint-disable-next-line prefer-const
    let { name, value } = event.target;
    if (name === 'rememberMe') {
      value = !rememberMe;
    }
    handleChange(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitLogin();
    setRequestIsLoad();
  };

  return (
    <div className="login">
      <h1>Connexion</h1>
      {loginError !== '' && (
        <div className="global-error">
          {loginError}
        </div>
      )}
      <p className="login__text">Vous avez déjà un compte ? Connectez-vous ci-dessous.</p>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Adresse email"
          className="global-input"
          onChange={changeInput}
          value={email}
        />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          className="global-input"
          onChange={changeInput}
          value={password}
        />
        <label className="login__form__remember">
          <input
            type="checkbox"
            name="rememberMe"
            checked={rememberMe}
            onChange={changeInput}
          /> Se souvenir de moi
        </label>
        {!requestIsLoad && <button type="submit" className="global-button">Se connecter</button>}
        {requestIsLoad && <button type="button" className="global-button" disabled><Loader withMargin={false} /></button>}
      </form>
      <button type="button" className="login__link" onClick={handlePassword}>Mot de passe oublié ?</button>
    </div>
  );
};

Login.propTypes = {
  displayModal: PropTypes.func.isRequired,
  changeValue: PropTypes.func.isRequired,
  submitLogin: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  loginError: PropTypes.string.isRequired,
  clearLoginError: PropTypes.func.isRequired,
  rememberMe: PropTypes.bool.isRequired,
  requestIsLoad: PropTypes.bool.isRequired,
  setRequestIsLoad: PropTypes.func.isRequired,
};

export default Login;
