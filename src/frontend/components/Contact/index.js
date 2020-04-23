/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './contact.scss';
import { useTitle } from 'src/hooks/useTitle';

const Contact = ({
  displayAlert,
  firstname,
  lastname,
  email,
  message,
  legalMentions,
  setField,
  sendMessage,
}) => {
  useTitle('Contact');

  const handleSubmit = (e) => {
    e.preventDefault();
    let error = false;

    if (firstname === '' || lastname === '' || email === '' || message === '') {
      error = true;
      displayAlert('Veuillez remplir tous les champs', false);
    }

    if (!error && !legalMentions) {
      error = true;
      displayAlert('Vous devez accepter les mentions légales', false);
    }

    if (!error) {
      sendMessage();
    }
  };

  const handleChangeField = (e) => {
    const { value, name, checked } = e.target;

    if (name === 'legalMentions') {
      setField(name, checked);
    }
    else {
      setField(name, value);
    }
  };

  return (
    <div className="wrapper contact">
      <h1 className="contact__title">Contact</h1>
      <form className="contact__form">
        <input className="contact__form__input global-input" placeholder="Nom*" name="firstname" value={firstname} onChange={handleChangeField} />
        <input className="contact__form__input global-input" placeholder="Prénom*" name="lastname" value={lastname} onChange={handleChangeField} />
        <input className="contact__form__input global-input" type="email" placeholder="Adresse email*" name="email" value={email} onChange={handleChangeField} />
        <textarea className="contact__form__textarea global-input" type="text" placeholder="Message*" name="message" value={message} onChange={handleChangeField} />
        <div className="contact__form__checkbox">
          <label>
            <input type="checkbox" className="contact__form__checkbox__input" name="legalMentions" value={legalMentions} onChange={handleChangeField} /> J'ai lu et j'accepte les <Link target="_blank" to="/mentions-legales" className="contact__form__checkbox__input__link">mentions légales</Link>
          </label>
        </div>
        <button className="contact__form__button global-button" type="submit" onClick={handleSubmit}>Envoyer</button>
      </form>
    </div>
  );
};

Contact.propTypes = {
  displayAlert: PropTypes.func.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  legalMentions: PropTypes.bool.isRequired,
  setField: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

export default Contact;
