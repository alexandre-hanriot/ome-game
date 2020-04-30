/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './contact.scss';
import { useTitle } from 'src/hooks/useTitle';
import { labelClassname } from 'src/utils/selectors';
import Loader from 'src/frontend/components/Loader';

const Contact = ({
  displayAlert,
  firstname,
  lastname,
  email,
  message,
  legalMentions,
  isLoad,
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
      setField('isLoad', true);
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
      <p>
        Pour toute demande concernant le site , ce formulaire vous propose d'envoyer un mail à l'équipe O'me Game.
      </p>
      <form className="contact__form">
        <label className={labelClassname(firstname)}>
          <input className="contact__form__input global-input" name="firstname" value={firstname} onChange={handleChangeField} />
          <span>Prénom*</span>
        </label>
        <label className={labelClassname(lastname)}>
          <input className="contact__form__input global-input" name="lastname" value={lastname} onChange={handleChangeField} />
          <span>Nom*</span>
        </label>
        <label className={labelClassname(email)}>
          <input type="email" className="contact__form__input global-input" name="email" value={email} onChange={handleChangeField} />
          <span>Adresse email*</span>
        </label>
        <label className={labelClassname(message)}>
          <textarea className="contact__form__textarea global-input" type="text" name="message" value={message} onChange={handleChangeField} />
          <span>Message*</span>
        </label>

        <div className="contact__form__checkbox">
          <label>
            <input type="checkbox" className="contact__form__checkbox__input" name="legalMentions" value={legalMentions} onChange={handleChangeField} /> J'ai lu et j'accepte les <Link target="_blank" to="/mentions-legales" className="contact__form__checkbox__input__link">mentions légales</Link>
          </label>
        </div>

        <div class="contact__form__recaptcha"><div class="g-recaptcha" data-sitekey="6LeDgfAUAAAAAEz5C4vuqMAZzsC0irWyOumQdx4l"></div></div>

        {isLoad && <button className="contact__form__button global-button" type="button" disabled><Loader withMargin={false} /></button>}
        {!isLoad && <button className="contact__form__button global-button" type="submit" onClick={handleSubmit}>Envoyer</button>}
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
  isLoad: PropTypes.bool.isRequired,
  setField: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

export default Contact;
