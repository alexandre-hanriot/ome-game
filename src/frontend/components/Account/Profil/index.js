import React from 'react';
import { Link } from 'react-router-dom';
import { useTitle } from 'src/hooks/useTitle';
import PropTypes from 'prop-types';

import './profil.scss';

const Profil = ({ changeProfilInput, userData }) => {
  useTitle('Mon profil');
  const changeInput = (event) => {
    // eslint-disable-next-line prefer-const
    let { value, name } = event.currentTarget;
    if (name === 'display_name') {
      console.log(value);
      value = Boolean(Number((value)));
    }
    console.log(value);
    changeProfilInput(name, value);
  };

  return (
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

            <input
              type="text"
              value={userData.user.lastname}
              onChange={changeInput}
              name="lastname"
              placeholder="Nom"
              className="account-profil__infos__field global-input"
            />
            <input
              type="text"
              value={userData.user.firstname}
              onChange={changeInput}
              name="firstname"
              placeholder="Prénom"
              className="account-profil__infos__field global-input"
            />
            <input
              type="text"
              value={userData.user.username}
              onChange={changeInput}
              name="username"
              placeholder="Pseudo"
              className="account-profil__infos__field global-input"
            />
            <input
              type="email"
              value={userData.user.email}
              onChange={changeInput}
              name="email"
              placeholder="Adresse email"
              className="account-profil__infos__field global-input"
            />
            <input
              type="text"
              value={userData.user.phone}
              onChange={changeInput}
              name="phone"
              placeholder="Téléphone"
              className="account-profil__infos__field global-input"
            />
          </div>
        </div>

        <div className="account-profil__container__right">
          <div className="account-profil__address">
            <h2 className="account-profil__subtitle">Adresse postale</h2>

            <input
              type="text"
              value={userData.user.postal_code}
              onChange={changeInput}
              name="postal_code"
              placeholder="Code postal"
              className="account-profil__address__field global-input"
            />
            <input
              type="text"
              value={userData.user.city}
              onChange={changeInput}
              name="city"
              placeholder="Ville"
              className="account-profil__address__field global-input"
            />
            <input
              type="text"
              value={userData.user.address}
              onChange={changeInput}
              name="address"
              placeholder="Adresse"
              className="account-profil__address__field global-input"
            />
          </div>

          <div className="account-profil__password">
            <h2 className="account-profil__subtitle">Mot de passe</h2>

            <input
              type="password"
              value={userData.user.old_password}
              onChange={changeInput}
              name="old_password"
              placeholder="Ancien mot de passe"
              className="account-profil__password__field global-input"
            />
            <input
              type="password"
              value={userData.user.new_password}
              onChange={changeInput}
              name="new_password"
              placeholder="Nouveau mot de passe"
              className="account-profil__password__field global-input"
            />
            <input
              type="password"
              value={userData.user.confirm_new_password}
              onChange={changeInput}
              name="confirm_new_password"
              placeholder="Confirmer le nouveau mot de passe"
              className="account-profil__password__field global-input"
            />
          </div>

          <div className="account-profil__params">
            <h2 className="account-profil__subtitle">Paramètres</h2>

            <div className="account-profil__params__content">
              Inscrit le {/* formatDate(userData.user.createdAt) */ userData.user.createdAt}<br />
              <br />
              <label>
                <input
                  type="radio"
                  // eslint-disable-next-line react/jsx-boolean-value
                  value="1"
                  onChange={changeInput}
                  name="display_name"
                  checked={userData.user.display_name}
                /> Afficher son prénom/nom
              </label><br />
              <label>
                <input
                  type="radio"
                  value="0"
                  onChange={changeInput}
                  checked={userData.user.display_name === false}
                  name="display_name"
                /> Afficher son pseudo
              </label><br />
            </div>
          </div>
        </div>
      </div>
      <button type="submit" className="account-profil__submit">Enregistrer les modifications</button>
    </div>
  );
};

Profil.propTypes = {
  changeProfilInput: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
};

export default Profil;
