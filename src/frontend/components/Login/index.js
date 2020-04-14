/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import './login.scss';
// use Sanitize on inputs for increase security
const Login = ({
  displayModal, changeValue, email, password, submitLogin,
}) => {
  const handlePassword = () => {
    displayModal('forgotPassword');
  };
  const handleChange = (identifier, newValue) => {
    changeValue(identifier, newValue);
  };
  const changeInput = (event) => {
    const identifier = event.target.type;
    const newValue = event.target.value;
    handleChange(identifier, newValue);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    submitLogin();
  };

  return (
    <div className="login">
      <h1>Connexion</h1>
      <p className="login__text">Vous avez déjà un compte ? Connectez-vous ci-dessous.</p>
      <form className="login__form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Adresse email" className="global-input" onChange={changeInput} value={email} />
        <input type="password" placeholder="Mot de passe" className="global-input" onChange={changeInput} value={password} />
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
  changeValue: PropTypes.func.isRequired,
  submitLogin: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default Login;
