import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Modal from 'src/frontend/containers/Modal';
import ConfirmSupp from 'src/frontend/containers/Account/Modal';
import './account.scss';

const Account = ({ displayModal, showModal }) => {
  const handleModal = () => {
    displayModal('confirmSupp');
  };
  return (
    <div className="wrapper account">
      {showModal === 'confirmSupp' && (
        <Modal content={<ConfirmSupp />} />
      )}
      <div className="account__breadcrumb">
        <Link to="/">Accueil</Link> > Mon compte
      </div>
      <h1 className="account__title">Mon Compte</h1>
      <div className="account__dashboard">
        <div className="account__general reservation">
          <h2 className="account__general__subtitle">Mes réservations</h2>
          <table className="account__general__table">
            <tbody className="account__general__table__body">
              <tr className="account__general__table__body__tr">
                <td className="account__general__table__body__td account__general__table__body__td--left">Nom de l'offre</td>
                <td className="account__general__table__body__td">
                  <button
                    className="account__general__table__body__td__button__remove"
                    type="button"
                    title="annuler"
                    onClick={handleModal}
                  >
                    <i className="far fa-times" />
                  </button>
                </td>
              </tr>
              <tr className="account__general__table__body__tr">
                <td className="account__general__table__body__td account__general__table__body__td--left">Nom de l'offre</td>
                <td className="account__general__table__body__td">
                  <button
                    className="account__general__table__body__td__button__remove"
                    type="button"
                    title="annuler"
                  >
                    <i className="far fa-times" />
                  </button>
                </td>
              </tr>
              <tr className="account__general__table__body__tr">
                <td className="account__general__table__body__td account__general__table__body__td--left">Nom de l'offre</td>
                <td className="account__general__table__body__td">
                  <button
                    className="account__general__table__body__td__button__remove"
                    type="button"
                    title="annuler"
                  >
                    <i className="far fa-times" />
                  </button>
                </td>
              </tr>
              <tr className="account__general__table__body__tr">
                <td className="account__general__table__body__td account__general__table__body__td--left">Nom de l'offre</td>
                <td className="account__general__table__body__td">
                  <button
                    className="account__general__table__body__td__button__remove"
                    type="button"
                    title="annuler"
                  >
                    <i className="far fa-times" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <Link to="/compte/reservations" className="account__general__button global-button global-button--light"><i className="far fa-eye" /> Voir plus</Link>
        </div>

        {/* Mes Offres */}
        <div className="account__general offer">
          <h2 className="account__general__subtitle">Mes offres</h2>
          <table className="account__general__table">
            <tbody className="account__general__table__body">
              <tr className="account__general__table__body__tr">
                <td className="account__general__table__body__td account__general__table__body__td--left">Nom de l'offre</td>
                <td className="account__general__table__body__td">
                  <span
                    className="account__general__table__body__td__disponible"
                  >
                    disponible
                  </span>
                </td>
                <td className="account__general__table__body__td">
                  <Link
                    className="account__general__table__body__td__button__pencil"
                    to="/compte/offres/ajouter"
                  >
                    <i className="far fa-pencil-alt" />
                  </Link>
                  <button
                    className="account__general__table__body__td__button__remove"
                    type="button"
                    onClick={handleModal}
                  >
                    <i className="far fa-times" />
                  </button>
                </td>
              </tr>
              <tr className="account__general__table__body__tr">
                <td className="account__general__table__body__td account__general__table__body__td--left">Nom de l'offre</td>
                <td className="account__general__table__body__td">
                  <span
                    className="account__general__table__body__td__disponible"
                  >
                    disponible
                  </span>
                </td>
                <td className="account__general__table__body__td">
                  <Link
                    className="account__general__table__body__td__button__pencil"
                    to="/compte/offres/ajouter"
                  >
                    <i className="far fa-pencil-alt" />
                  </Link>
                  <button
                    className="account__general__table__body__td__button__remove"
                    type="button"
                  >
                    <i className="far fa-times" />
                  </button>
                </td>
              </tr>
              <tr className="account__general__table__body__tr">
                <td className="account__general__table__body__td account__general__table__body__td--left">Nom de l'offre</td>
                <td className="account__general__table__body__td">
                  <span
                    className="account__general__table__body__td__disponible"
                  >
                    disponible
                  </span>
                </td>
                <td className="account__general__table__body__td">
                  <Link
                    className="account__general__table__body__td__button__pencil"
                    to="/compte/offres/ajouter"
                  >
                    <i className="far fa-pencil-alt" />
                  </Link>
                  <button
                    className="account__general__table__body__td__button__remove"
                    type="button"
                    onClick={handleModal}
                  >
                    <i className="far fa-times" />
                  </button>
                </td>
              </tr>
              <tr className="account__general__table__body__tr">
                <td className="account__general__table__body__td account__general__table__body__td--left">Nom de l'offre</td>
                <td className="account__general__table__body__td">
                  <span
                    className="account__general__table__body__td__disponible"
                  >
                    disponible
                  </span>
                </td>
                <td className="account__general__table__body__td">
                  <Link
                    className="account__general__table__body__td__button__pencil"
                    to="/compte/offres/ajouter"
                  >
                    <i className="far fa-pencil-alt" />
                  </Link>
                  <button
                    className="account__general__table__body__td__button__remove"
                    type="button"
                    onClick={handleModal}
                  >
                    <i className="far fa-times" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <Link to="/compte/offres" className="account__general__button global-button global-button--light"><i className="far fa-eye" /> Voir plus</Link>
        </div>

        {/* Ma liste de souhait */}
        <div className="account__general wish-list">
          <h2 className="account__general__subtitle">Ma liste de souhait</h2>
          <table className="account__general__table">
            <tbody className="account__general__table__body">
              <tr className="account__general__table__body__tr">
                <td className="account__general__table__body__td account__general__table__body__td--left">Nom de l'offre</td>
                <td className="account__general__table__body__td">
                  <span
                    className="account__general__table__body__td__disponible"
                  >
                    disponible
                  </span>
                </td>
                <td className="account__general__table__body__td">
                  <button
                    className="account__general__table__body__td__button__bell--inactive"
                    type="button"
                  >
                    <i className="fas fa-bell" />
                  </button>
                  <button
                    className="account__general__table__body__td__button__bellslash account__general__table__body__td__button__bellslash--active"
                    type="button"
                  >
                    <i className="fas fa-bell-slash" />
                  </button>
                  <button
                    className="account__general__table__body__td__button__remove"
                    type="button"
                    title="annuler"
                    onClick={handleModal}
                  >
                    <i className="fas fa-times" />
                  </button>
                </td>
              </tr>
              <tr className="account__general__table__body__tr">
                <td className="account__general__table__body__td account__general__table__body__td--left">Nom de l'offre</td>
                <td className="account__general__table__body__td">
                  <span
                    className="account__general__table__body__td__disponible--inactive"
                  >
                    disponible
                  </span>
                  <span
                    className="account__general__table__body__td__indisponible--active account__general__table__body__td__indisponible"
                  >
                    indisponible
                  </span>
                </td>
                <td className="account__general__table__body__td">
                  <button
                    className="account__general__table__body__td__button__bell"
                    type="button"
                  >
                    <i className="fas fa-bell" />
                  </button>
                  <button
                    className="account__general__table__body__td__button__bellslash account__general__table__body__td__button__bellslash--inactive"
                    type="button"
                  >
                    <i className="fas fa-bell-slash" />
                  </button>
                  <button
                    className="account__general__table__body__td__button__remove"
                    type="button"
                    title="annuler"
                    onClick={handleModal}
                  >
                    <i className="fas fa-times" />
                  </button>
                </td>
              </tr>
              <tr className="account__general__table__body__tr">
                <td className="account__general__table__body__td account__general__table__body__td--left">Nom de l'offre</td>
                <td className="account__general__table__body__td">
                  <span
                    className="account__general__table__body__td__disponible"
                  >
                    disponible
                  </span>
                </td>
                <td className="account__general__table__body__td">
                  <button
                    className="account__general__table__body__td__button__bell"
                    type="button"
                  >
                    <i className="fas fa-bell" />
                  </button>
                  <button
                    className="account__general__table__body__td__button__bellslash account__general__table__body__td__button__bellslash--inactive"
                    type="button"
                  >
                    <i className="fas fa-bell-slash" />
                  </button>
                  <button
                    className="account__general__table__body__td__button__remove"
                    type="button"
                    title="annuler"
                    onClick={handleModal}
                  >
                    <i className="fas fa-times" />
                  </button>
                </td>
              </tr>
              <tr className="account__general__table__body__tr">
                <td className="account__general__table__body__td account__general__table__body__td--left">Nom de l'offre</td>
                <td className="account__general__table__body__td">
                  <span
                    className="account__general__table__body__td__disponible"
                  >
                    disponible
                  </span>
                </td>
                <td className="account__general__table__body__td">
                  <button
                    className="account__general__table__body__td__button__bell"
                    type="button"
                  >
                    <i className="fas fa-bell" />
                  </button>
                  <button
                    className="account__general__table__body__td__button__bellslash account__general__table__body__td__button__bellslash--inactive"
                    type="button"
                  >
                    <i className="fas fa-bell-slash" />
                  </button>
                  <button
                    className="account__general__table__body__td__button__remove"
                    type="button"
                    title="annuler"
                    onClick={handleModal}
                  >
                    <i className="fas fa-times" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Profil */}
        <div className="account__general profil">
          <h2 className="account__general__subtitle">Profil</h2>
          <div className="account__profil">
            <div className="account__profil__left">
              <ul className="account__profil__left__list">
                <li className="account__profil__left__list__content">Nom Prénom :</li>
                <li className="account__profil__left__list__content">Pseudo :</li>
                <li className="account__profil__left__list__content">Adresse email :</li>
                <li className="account__profil__left__list__content">Téléphone :</li>
                <li className="account__profil__left__list__content">Adresse Postale :</li>
              </ul>
              <Link to="/compte/profil" className="account__profil__left__link ">Modifier</Link>
            </div>
            <div className="account__profil__right">
              <i className="far fa-portrait account__profil__right__picture" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Account.propTypes = {
  displayModal: PropTypes.func.isRequired,
  showModal: PropTypes.string.isRequired,
};

export default Account;
