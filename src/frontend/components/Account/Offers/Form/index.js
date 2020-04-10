import React from 'react';
import { Link } from 'react-router-dom';

import './form.scss';

const Form = () => (
  <div className="wrapper account-offers-form">

    <div className="account-offers-form__breadcrumb">
      <Link to="/">Accueil</Link> > <Link to="/compte">Mon compte</Link> > <Link to="/compte/offres">Mon offres</Link> > Ajouter
    </div>

    <h1 className="account-offers-form__title">Ajouter une offre</h1>

    <div className="account-offers-form__container">
      <div className="account-offers-form__container__left">
        <input type="text" placeholder="Nom de l'offre" className="account-offers-form__name global-input" />

        <h2 className="account-offers-form__subtitle">Jeu</h2>

        <input type="text" placeholder="Nom du jeu" className="account-offers-form__game__name global-input" />
        <div className="account-offers-form__game">
          <select className="global-select">
            <option value="">Jeu de rôle</option>
            <option value="">Jeu de carte</option>
            <option value="">Jeu de plateau</option>
          </select>
          <input type="text" placeholder="Nb de joueurs" className="global-input" />
        </div>
        <div className="account-offers-form__game">
          <input type="text" placeholder="Durée d'une partie" className="global-input" />
          <input type="text" placeholder="Age minimum" className="global-input" />
        </div>

        <h2 className="account-offers-form__subtitle">Description</h2>

        <textarea
          placeholder="Description"
          className="account-offers-form__description global-input"
        />
        <p className="account-offers-form__dates">Créer le xx/xx/xxxx à xxhxx</p>
        <p className="account-offers-form__dates">Modifier le xx/xx/xxxx à xxhxx</p>
        <button type="submit" className="account-offers-form__submit">Ajouter</button>
      </div>

      <div className="account-offers-form__container__right">

        <div className="account-offers-form__block account-offers-form__block--flex50">
          <div className="account-offers-form__status">
            <h2 className="account-offers-form__subtitle">Etat</h2>
            <div>
              <label htmlFor>
                <input type="radio" name="status" checked /> Actif
              </label>
            </div>
            <div><label htmlFor><input type="radio" name="status" /> Inactif</label></div>
          </div>
          <div className="account-offers-form__disponibility">
            <h2 className="account-offers-form__subtitle">Disponibilité</h2>
            <div><label htmlFor><input type="radio" name="disponibility" checked /> Disponible</label></div>
            <div><label htmlFor><input type="radio" name="disponibility" /> Non disponible</label></div>
          </div>
        </div>

        <div className="account-offers-form__block">
          <h2 className="account-offers-form__subtitle">Type</h2>
          <div className="account-offers-form__type">
            <select className="global-select">
              <option value="">Location</option>
              <option value="">Prêt</option>
            </select>
            <input type="text" placeholder="Prix (€)" className="global-input" />
          </div>
        </div>

        <div className="account-offers-form__block">
          <h2 className="account-offers-form__subtitle">Image</h2>
          <button type="button" className="account-offers-form__game__image__define">Définir une image</button>
        </div>

        <div className="account-offers-form__block">
          <h2 className="account-offers-form__subtitle">Localisation</h2>
          <input type="text" placeholder="Saisissez un lieu" className="account-offers-form__location global-input" />
          <div className="account-offers-form__map"> </div>
        </div>

      </div>
    </div>
  </div>
);

export default Form;
