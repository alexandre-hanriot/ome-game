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
  reservations,
  offers,
  favorites,
  fetchParamsReservations,
  fetchParamsOffers,
  fetchFavorites,
  user,

}) => {
  useTitle('Mon compte');

  useEffect(() => {
    fetchParamsReservations();
    fetchParamsOffers();
    fetchFavorites();
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
              {reservations.map((reservation) => (
                <tr className="account__general__table__body__tr" key={reservation.id}>
                  <td className="account__general__table__body__td account__general__table__body__td--left">{reservation.offer.title}</td>
                  <td className="account__general__table__body__td">
                    {reservation.status === '0' && (
                      <span
                        className="account__general__table__body__td__circle__pending"
                      />
                    )}
                    {/* {reservation.status === '1' && (
                      <span
                        className="account__general__table__body__td__disponible"
                      >validée / vert
                      </span>
                    )} */}
                    {reservation.status === '2' && (
                      <div
                        className="account__general__table__body__td__circle--available"
                      />
                    )}
                    {/* {reservation.status === '3' && (
                      <span
                        className="account__general__table__body__td__disponible"
                      >terminée
                      </span>
                    )} */}
                    {reservation.status === '4' && (
                      <span
                        className="account__general__table__body__td__circle--refused"
                      />
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
          {reservations.length === 0 ? <i className="fas fa-chess-rook account__general__icon" /> : <Link to="/compte/reservations" className="account__general__button global-button global-button--light"><i className="far fa-eye" /> Voir plus</Link>}
        </div>

        {/* Mes Offres */}
        <div className="account__general offer">
          <h2 className="account__general__subtitle">Mes offres</h2>
          <table className="account__general__table">
            <tbody className="account__general__table__body">
              {offers.map((offerData) => {
                return (
                  <tr className="account__general__table__body__tr" key={offerData.id}>
                    <td
                      className="account__general__table__body__td account__general__table__body__td--left"
                    >{offerData.title}
                    </td>
                    <td className="account__general__table__body__td">
                      {offerData.is_available ? (
                        <span
                          className="account__general__table__body__td__status__available"
                        >disponible
                        </span>
                      ) : (
                        <span
                          className="account__general__table__body__td__status__unavailable"
                        >réservée
                        </span>
                      )}
                    </td>
                    <td className="account__general__table__body__td account__general__table__body__td--button">
                      <Link
                        className="account__general__table__body__td__button__pencil"
                        to={`compte/offre/${offerData.id}`}
                      >
                        <i className="far fa-pencil-alt" />
                      </Link>
                      <i className="fas fa-trash-alt account__general__table__body__td__button__remove" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {offers.length === 0 ? <i className="fas fa-chess-bishop account__general__icon" /> : <Link to="/compte/offres" className="account__general__button global-button global-button--light"><i className="far fa-eye" /> Voir plus</Link>}
        </div>

        {/* Ma liste de souhait */}
        <div className="account__general wish-list">
          <h2 className="account__general__subtitle">Ma liste de souhait</h2>
          <div className="account__general__table__test">
            <table className="account__general__table">
              <tbody className="account__general__table__body">
                {favorites.map((favorite) => (
                  <tr className="account__general__table__body__tr" key={favorite.id}>
                    <td className="account__general__table__body__td
                        account__general__table__body__td--left"
                    >
                      {favorite.offer.title}
                    </td>
                    <td className="account__general__table__body__td">
                      {favorite.offer.is_available ? (
                        <span
                          className="account__general__table__body__td__status__available"
                        >disponible
                        </span>
                      ) : (
                        <span
                          className="account__general__table__body__td__status__unavailable"
                        >non disponible
                        </span>
                      )}
                    </td>
                    <td className="account__general__table__body__td account__general__table__body__td--button">
                      {favorite.notify_when_available ? <i className="fas fa-bell account__general__table__body__td__button__bell--active" /> : <i className="fas fa-bell-slash account__general__table__body__td__button__bellslash account__general__table__body__td__button__bellslash--active" />}
                      <i className="fas fa-times account__general__table__body__td__button__remove" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {favorites.length === 0 ? <a className="fas fa-chess-queen account__general__icon" /> : ''}
          </div>
        </div>
        {/* Profil */}
        <div className="account__general profil">
          <h2 className="account__general__subtitle account__general__subtitle__profil">Mon profil</h2>
          <div className="account__profil">
            <div className="account__profil__left">
              <ul className="account__profil__left__list">
                <li className="account__profil__left__list__content"><span className="account__profil__left__list__content__bold">Nom Prénom :</span>{user.firstname}</li>
                <li className="account__profil__left__list__content"><span className="account__profil__left__list__content__bold">Pseudo :</span> {user.username}</li>
                <li className="account__profil__left__list__content"><span className="account__profil__left__list__content__bold">Adresse email :</span> {user.email}</li>
                <li className="account__profil__left__list__content"><span className="account__profil__left__list__content__bold">Téléphone : </span>{user.phone}</li>
                <ul className="account__profil__left__list__content"><span className="account__profil__left__list__content__bold">Adresse postale : </span>
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
  fetchFavorites: PropTypes.func.isRequired,
  offers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      is_available: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isrequired,
      offerId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isrequired,
    }).isRequired,
  ).isRequired,
  user: PropTypes.object.isRequired,
};

export default Account;
