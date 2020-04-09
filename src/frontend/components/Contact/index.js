import React from 'react';

import './contact.scss';

const Contact = () => (
  <div className="wrapper contact">
    <h1 className="contact__title">Contact</h1>
    <form className="contact__form">
      <input className="contact__form__input" placeholder="Nom" label="" />
      <input className="contact__form__input" placeholder="Prenom" label="" />
      <input className="contact__form__input" type="email" placeholder="adresse mail" label="" />
      <textarea className="contact__form__textarea" type="text" placeholder="Message" label="" />
      <div className="contact__form__checkbox">
        <input type="checkbox" className="contact__form__checkbox__input" />
        <p className="contact__form__checkbox__text">Accepter les mentions légales du site</p>
      </div>
      <button className="contact__form__button" type="submit">Envoyer</button>
    </form>
  </div>

);

export default Contact;
