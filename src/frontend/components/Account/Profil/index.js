import React from 'react';
import { Link } from 'react-router-dom';

import './profil.scss';

const Profil = () => (
  <div className="wrapper account-profil">

    <div className="account-profil__breadcrumb">
      <Link to="/">Accueil</Link> > <Link to="/compte">Mon compte</Link> > Mon profil
    </div>

    <h1 className="account-profil__title">Mon profil</h1>

    <div className="account-profil__container">
      <div className="account-profil__container__left">
        <div className="account-profil__avatar">
          <h2 className="account-profil__subtitle">Photo</h2>
          <div className="account-profil__avatar__image">
            <i className="fas fa-user"> </i>
            <span>Modifier</span>
          </div>
          <button type="button" className="account-profil__avatar__remove">Supprimer l'image</button>
        </div>

        <div className="account-profil__infos">
          <h2 className="account-profil__subtitle">Informations personnelles</h2>

          <input type="text" placeholder="Nom" className="account-profil__infos__field" />
          <input type="text" placeholder="Prénom" className="account-profil__infos__field" />
          <input type="text" placeholder="Pseudo" className="account-profil__infos__field" />
          <input type="email" placeholder="Adresse email" className="account-profil__infos__field" />
          <input type="text" placeholder="Téléphone" className="account-profil__infos__field" />
        </div>
      </div>

      <div className="account-profil__container__right">
        <div className="account-profil__address">
          <h2 className="account-profil__subtitle">Adresse postale</h2>

          <input type="text" placeholder="Code postal" className="account-profil__address__field" />
          <input type="text" placeholder="Ville" className="account-profil__address__field" />
          <input type="text" placeholder="Adresse" className="account-profil__address__field" />
        </div>

        <div className="account-profil__password">
          <h2 className="account-profil__subtitle">Mot de passe</h2>

          <input type="password" placeholder="Ancien mot de passe" className="account-profil__password__field" />
          <input type="password" placeholder="Nouveau mot de passe" className="account-profil__password__field" />
          <input type="password" placeholder="Confirmer le nouveau mot de passe" className="account-profil__password__field" />
        </div>

        <div className="account-profil__params">
          <h2 className="account-profil__subtitle">Paramètres</h2>

          <div className="account-profil__params__content">
            Inscrit le xx/xx/xxxx<br />
            <br />
            <label><input type="radio" name="displayName" checked /> Afficher son prénom/nom</label><br />
            <label><input type="radio" name="displayName" /> Afficher son pseudo</label><br />
          </div>
        </div>
      </div>
    </div>
    <button type="submit" className="account-profil__submit">Enregistrer les modifications</button>
  </div>
);

export default Profil;
