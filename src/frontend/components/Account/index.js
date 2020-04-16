import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Modal from 'src/frontend/containers/Modal';
import Alert from 'src/frontend/containers/Alert';
import ConfirmSupp from 'src/frontend/containers/Account/Modal';
import { useTitle } from 'src/hooks/useTitle';
import './account.scss';

const Account = ({
  displayModal,
  showModal,
  showAlert,
  data,
  data2,
  favoritesData,
  fetchParamsReservations,
  fetchParamsOffers,
  user,
}) => {
  useTitle('Mon compte');

  useEffect(() => {
    fetchParamsReservations();
    fetchParamsOffers();
  }, []);

  const handleModal = () => {
    displayModal('confirmSupp');
  };
  return (
    <div className="wrapper account">
      {showModal === 'confirmSupp' && (
        <Modal content={<ConfirmSupp />} />
      )}
      {showAlert && (<Alert />)}

      <div className="account__breadcrumb">
        <Link to="/">Accueil</Link> > Mon compte
      </div>
      <h1 className="account__title">Mon Compte</h1>
      <div className="account__dashboard">
        {/* Reservations */}
        <div className="account__general reservation">
          <h2 className="account__general__subtitle">Mes réservations</h2>
          <table className="account__general__table">
            <tbody className="account__general__table__body">
              {data.map((reservation) => (
                <tr className="account__general__table__body__tr" key={reservation.id}>
                  <td className="account__general__table__body__td account__general__table__body__td--left">{reservation.offer.title}</td>
                  <td className="account__general__table__body__td">
                    {reservation.status === '0' && (
                      <span
                        className="account__general__table__body__td__disponible"
                      >en attente de validation
                      </span>
                    )}
                    {reservation.status === '1' && (
                      <span
                        className="account__general__table__body__td__disponible"
                      >validée
                      </span>
                    )}
                    {reservation.status === '2' && (
                      <span
                        className="account__general__table__body__td__disponible"
                      >en cours
                      </span>
                    )}
                    {reservation.status === '3' && (
                      <span
                        className="account__general__table__body__td__disponible"
                      >terminée
                      </span>
                    )}
                    {reservation.status === '4' && (
                      <span
                        className="account__general__table__body__td__disponible"
                      >annulée
                      </span>
                    )}
                  </td>
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
              ))}
            </tbody>
          </table>
          {data.length === 0 ? <i className="fas fa-chess-rook account__general__icon" /> : <Link to="/compte/reservations" className="account__general__button global-button global-button--light"><i className="far fa-eye" /> Voir plus</Link>}
        </div>

        {/* Mes Offres */}
        <div className="account__general offer">
          <h2 className="account__general__subtitle">Mes offres</h2>
          <table className="account__general__table">
            <tbody className="account__general__table__body">
              {data2.map((offerData) => (
                <tr className="account__general__table__body__tr" key={offerData.id}>
                  <td
                    className="account__general__table__body__td account__general__table__body__td--left"
                  >{offerData.title}
                  </td>
                  <td className="account__general__table__body__td">
                    <span
                      className="account__general__table__body__td__disponible"
                    >
                      {offerData.is_available ? 'disponible' : 'indisponible'}
                    </span>
                  </td>
                  <td className="account__general__table__body__td account__general__table__body__td--button">
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
              ))}
            </tbody>
          </table>
          {data2.length === 0 ? <i className="fas fa-chess-bishop" /> : <Link to="/compte/offres" className="account__general__button global-button global-button--light"><i className="far fa-eye" /> Voir plus</Link>}
        </div>

        {/* Ma liste de souhait */}
        <div className="account__general wish-list">
          <h2 className="account__general__subtitle">Ma liste de souhait</h2>
          <div className="account__general__table__test">
            <table className="account__general__table">
              <tbody className="account__general__table__body">
                {favoritesData.map((favoriteData) => (
                  <tr className="account__general__table__body__tr">
                    <td className="account__general__table__body__td
                        account__general__table__body__td--left"
                    >
                      {favoriteData.offerId}
                    </td>
                    <td className="account__general__table__body__td">
                      <span
                        className="account__general__table__body__td__disponible"
                      >
                        {favoriteData.notify_when_available ? 'disponible' : 'non disponible'}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Profil */}
        <div className="account__general profil">
          <h2 className="account__general__subtitle">Profil</h2>
          <div className="account__profil">
            <div className="account__profil__left">
              <ul className="account__profil__left__list">
                <li className="account__profil__left__list__content">Nom Prénom :{user.firstname}</li>
                <li className="account__profil__left__list__content">Pseudo : {user.username}</li>
                <li className="account__profil__left__list__content">Adresse email : {user.email}</li>
                <li className="account__profil__left__list__content">Téléphone : {user.phone}</li>
                <ul className="account__profil__left__list__content">Adresse Postale :
                  <li>{user.adress}</li>
                  <li>{user.postal_code}, {user.city}</li>
                </ul>
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
  showAlert: PropTypes.bool.isRequired,
  fetchParamsReservations: PropTypes.func.isRequired,
  fetchParamsOffers: PropTypes.func.isRequired,
  data2: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      is_available: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isrequired,
      offerId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  user: PropTypes.array.isRequired,
  favoritesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      offerId: PropTypes.string.isRequired,
      notify_when_available: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Account;
