/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTitle } from 'src/hooks/useTitle';
import PropTypes from 'prop-types';
import { formatDate, labelClassname } from 'src/utils/selectors';
import Modal from 'src/frontend/containers/Modal';
import Upload from 'src/frontend/containers/Account/Profil/Upload';

import './profil.scss';

const Profil = ({
  changeProfilInput,
  userData,
  submitProfilUpdate,
  submitProfilChangePassword,
  clearProfilPasswords,
  displayAlert,
  showModal,
  displayModal,
}) => {
  useTitle('Mon profil');
  useEffect(() => () => {
    clearProfilPasswords();
  }, []);
  const changeInput = (event) => {
    // eslint-disable-next-line prefer-const
    let { value, name } = event.currentTarget;
    let errorDisplayName = false;

    if (name === 'display_name') {
      if (value === '1' && (userData.user.firstname === '' || userData.user.lastname === '')) {
        errorDisplayName = true;
      }
      value = Boolean(Number((value)));
    }

    if (errorDisplayName) {
      displayAlert('veuillez renseigner votre nom et prénom pour cocher cette option', false);
    }
    else {
      changeProfilInput(name, value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let error = false;

    if (userData.user.username === '') {
      displayAlert('veuillez renseigner un pseudo', false);
      error = true;
    }
    if (!error && userData.user.email === '') {
      displayAlert('veuillez renseigner un email', false);
      error = true;
    }

    if (!error) {
      if (!error && userData.user.old_password === ''
              && userData.user.new_password === ''
              && userData.user.confirm_new_password === '') {
        submitProfilUpdate();
      }

      if (!error && (userData.user.old_password !== ''
          || userData.user.confirm_new_password !== ''
          || userData.user.new_password !== '')) {
        if (userData.user.old_password === '') {
          displayAlert('veuillez renseigner votre mot de passe actuel', false);
          error = true;
        }
        if (!error) {
          if (userData.user.confirm_new_password !== userData.user.new_password
            && userData.user.confirm_new_password !== ''
            && userData.user.new_password !== '') {
            displayAlert('les mots de passe ne correspondent pas', false);
            error = true;
          }
          if (!error && (userData.user.confirm_new_password === '' || userData.user.new_password === '')) {
            displayAlert('veuillez renseigner un nouveau mot de passe', false);
            error = true;
          }
          if (!error && userData.user.confirm_new_password === userData.user.new_password) {
            if (userData.user.confirm_new_password !== ''
                && userData.user.new_password !== '') {
              submitProfilChangePassword();
            }
          }
        }
      }
    }
  };

  if (userData.user.lastname === null) {
    userData.user.lastname = '';
  }
  if (userData.user.firstname === null) {
    userData.user.firstname = '';
  }
  if (userData.user.email === null) {
    userData.user.email = '';
  }
  if (userData.user.phone === null) {
    userData.user.phone = '';
  }
  if (userData.user.postal_code === null) {
    userData.user.postal_code = '';
  }
  if (userData.user.city === null) {
    userData.user.city = '';
  }
  if (userData.user.address === null) {
    userData.user.address = '';
  }
  if (userData.user.old_password === null) {
    userData.user.old_password = '';
  }
  if (userData.user.new_password === null) {
    userData.user.new_password = '';
  }
  if (userData.user.confirm_new_password === null) {
    userData.user.confirm_new_password = '';
  }

  const handleClickDeleteImage = () => {
    changeProfilInput('picture', '');
  };

  const handleClickUpload = () => {
    displayModal('upload');
  };

  return (
    <div className="wrapper account-profil">

      <div className="account-profil__breadcrumb">
        <Link to="/">Accueil</Link> > <Link to="/compte">Tableau de bord</Link> > Mon profil
      </div>

      {showModal === 'upload' && <Modal content={<Upload />} />}

      <h1 className="account-profil__title">Mon profil</h1>
      <form onSubmit={handleSubmit}>
        <div className="account-profil__container">
          <div className="account-profil__container__left">
            <div className="account-profil__avatar">
              <h2 className="account-profil__subtitle">Photo</h2>
              {(userData.user.picture !== '' && userData.user.picture !== null) && (
                <div className="account-profil__avatar__image">
                  <img src={`http://ec2-34-205-156-142.compute-1.amazonaws.com/images/users/${userData.user.picture}`} alt="" />
                  <button type="button" onClick={handleClickDeleteImage}>Supprimer</button>
                </div>
              )}
              {(userData.user.picture === '' || userData.user.picture === null) && (
                <div className="account-profil__avatar__noimage">
                  <i className="fas fa-user"> </i>
                  <button type="button" onClick={handleClickUpload}>Modifier</button>
                </div>
              )}
            </div>

            <div className="account-profil__infos">
              <h2 className="account-profil__subtitle">Informations personnelles</h2>

              <label className={`${labelClassname(userData.user.lastname)} account-profil__infos__field`}>
                <input
                  type="text"
                  value={userData.user.lastname}
                  onChange={changeInput}
                  name="lastname"
                  className="global-input"
                />
                <span>Nom</span>
              </label>
              <label className={`${labelClassname(userData.user.firstname)} account-profil__infos__field`}>
                <input
                  type="text"
                  value={userData.user.firstname}
                  onChange={changeInput}
                  name="firstname"
                  className="global-input"
                />
                <span>Prénom</span>
              </label>
              <label className={`${labelClassname(userData.user.username)} account-profil__infos__field`}>
                <input
                  type="text"
                  value={userData.user.username}
                  onChange={changeInput}
                  name="username"
                  className="global-input"
                />
                <span>Pseudo</span>
              </label>
              <label className={`${labelClassname(userData.user.email)} account-profil__infos__field`}>
                <input
                  type="email"
                  value={userData.user.email}
                  onChange={changeInput}
                  name="email"
                  className="global-input"
                />
                <span>Adresse email</span>
              </label>
              <label className={`${labelClassname(userData.user.phone)} account-profil__infos__field`}>
                <input
                  type="text"
                  value={userData.user.phone}
                  onChange={changeInput}
                  name="phone"
                  className="global-input"
                />
                <span>Téléphone</span>
              </label>
            </div>
          </div>

          <div className="account-profil__container__right">
            <div className="account-profil__address">
              <h2 className="account-profil__subtitle">Adresse postale</h2>

              <label className={`${labelClassname(userData.user.postal_code)} account-profil__address__field`}>
                <input
                  type="text"
                  value={userData.user.postal_code}
                  onChange={changeInput}
                  name="postal_code"
                  className="global-input"
                />
                <span>Code postal</span>
              </label>
              <label className={`${labelClassname(userData.user.city)} account-profil__address__field`}>
                <input
                  type="text"
                  value={userData.user.city}
                  onChange={changeInput}
                  name="city"
                  className="global-input"
                />
                <span>Ville</span>
              </label>
              <label className={`${labelClassname(userData.user.address)} account-profil__address__field`}>
                <input
                  type="text"
                  value={userData.user.address}
                  onChange={changeInput}
                  name="address"
                  className="global-input"
                />
                <span>Adresse</span>
              </label>
            </div>

            <div className="account-profil__password">
              <h2 className="account-profil__subtitle">Mot de passe</h2>

              <label className={`${labelClassname(userData.user.old_password)} account-profil__password__field`}>
                <input
                  type="password"
                  value={userData.user.old_password}
                  onChange={changeInput}
                  name="old_password"
                  className="global-input"
                />
                <span>Ancien mot de passe</span>
              </label>
              <label className={`${labelClassname(userData.user.new_password)} account-profil__password__field`}>
                <input
                  type="password"
                  value={userData.user.new_password}
                  onChange={changeInput}
                  name="new_password"
                  className="global-input"
                />
                <span>Nouveau mot de passe</span>
              </label>
              <label className={`${labelClassname(userData.user.confirm_new_password)} account-profil__password__field`}>
                <input
                  type="password"
                  value={userData.user.confirm_new_password}
                  onChange={changeInput}
                  name="confirm_new_password"
                  className="account-profil__password__field global-input"
                />
                <span>Confirmer le nouveau mot de passe</span>
              </label>
            </div>

            <div className="account-profil__params">
              <h2 className="account-profil__subtitle">Paramètres</h2>

              <div className="account-profil__params__content">
                Inscrit le {formatDate(userData.user.createdAt, true)}<br />
                <br />
                <label>
                  <input
                    type="radio"
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
      </form>

    </div>
  );
};

Profil.propTypes = {
  changeProfilInput: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  submitProfilUpdate: PropTypes.func.isRequired,
  submitProfilChangePassword: PropTypes.func.isRequired,
  clearProfilPasswords: PropTypes.func.isRequired,
  displayAlert: PropTypes.func.isRequired,
  showModal: PropTypes.string.isRequired,
  displayModal: PropTypes.func.isRequired,
};

export default Profil;
