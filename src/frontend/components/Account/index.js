import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Modal from 'src/frontend/containers/Modal';
import Alert from 'src/frontend/containers/Alert';
import Details from 'src/frontend/containers/Account/Reservations/Details';
import ConfirmSupp from 'src/frontend/containers/Account/Modal';
import { useTitle } from 'src/hooks/useTitle';
import slugify from 'react-slugify';
import { truncateText } from 'src/utils/selectors';
import Loader from 'src/frontend/components/Loader';
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
  saveIdFavorite,
  saveIdReservation,
  user,
  requestIsLoad,
  setRequestIsLoad,
  updateNotifyFavorite,
  deleteFavorite,
  saveOfferId,
  displayAlert,
  changeOfferIsLoad,
}) => {
  useTitle('Mon tableau de bord');

  useEffect(() => {
    async function load() {
      await fetchParamsReservations();
      await fetchParamsOffers();
      await fetchFavorites();
      setRequestIsLoad();
    }
    load();

    return function cleanup() {
      setRequestIsLoad();
      changeOfferIsLoad();
    };
  }, []);

  const handleModalDetail = (e) => {
    const { id } = e.currentTarget.dataset;
    const reservation = reservations.filter((resa) => resa.id.toString() === id.toString());
    displayModal('reservation', { reservation: reservation[0] });
  };

  const handleFavorite = (e) => {
    const { id, notify } = e.currentTarget.dataset;
    saveIdFavorite(id, notify);
    updateNotifyFavorite();
    if (notify === 'true') {
      displayAlert('Vous ne serez plus notifié de sa disponibilité');
    }
    if (notify === 'false') {
      displayAlert('Vous serez notifié dès la disponibilité de cette offre');
    }
  };

  const removeFavorite = (e) => {
    const { id } = e.currentTarget.dataset;
    saveIdFavorite(id);
    deleteFavorite();
  };

  const handleModalOffer = (e) => {
    const { id } = e.currentTarget.dataset;
    saveOfferId(id);
    displayModal('modalOffer');
    // deleteOffer();
  };

  const handleRemoveImpossible = () => {
    displayAlert('Vous ne pouvez pas supprimer une offre qui est réservée', false);
  };

  const handleModalOfferImpossible = () => {
    displayModal('modalOfferImpossible');
  };

  const handleModalReservation = (e) => {
    const { id, status } = e.currentTarget.dataset;
    if (status === '0' || status === '4' || status === '3') {
      saveIdReservation(id);
      displayModal('modalReservation');
    }
    if (status === '1' || status === '2') {
      displayModal('modalReservationImpossible');
    }
  };
  return (
    <>
      {!requestIsLoad && <Loader />}
      {requestIsLoad && (
        <div className="wrapper account">
          {(showModal === 'modalReservation' || showModal === 'modalOffer' || showModal === 'modalOfferImpossible' || showModal === 'modalReservationImpossible') && (
            <Modal content={<ConfirmSupp />} />
          )}
          {showAlert && (<Alert />)}
          {showModal === 'reservation' && (
          <Modal content={<Details reservations={reservations} />} />
          )}
          <div className="account__breadcrumb">
            <Link to="/">Accueil</Link> > Tableau de bord
          </div>
          <h1 className="account__title">Tableau de bord</h1>
          <div className="account__dashboard">
            {/* Reservations */}
            <div className="account__general reservation">
              <h2 className="account__general__subtitle">Mes dernières réservations</h2>
              <table className="account__general__table">
                <tbody className="account__general__table__body">
                  {reservations.map((reservation) => (
                    <tr className="account__general__table__body__tr" key={reservation.id}>
                      <td className="account__general__table__body__td account__general__table__body__td--left">
                        <Link
                          to={`/recherche/jeux/${reservation.offer.id}/${slugify(reservation.offer.title, { lower: true })}`}
                          className="account__general__table__body__td__link"
                          target="_blank"
                        >{truncateText(reservation.offer.title, 24)}
                        </Link>
                      </td>
                      <td className="account__general__table__body__td  account__general__table__body__td--status">
                        {reservation.status === '0' && (
                          <span
                            className="account__general__table__body__td__status__pending"
                          >En attente
                          </span>
                        )}
                        {reservation.status === '1' && (
                          <span
                            className="account__general__table__body__td__status__available"
                          >Acceptée
                          </span>
                        )}
                        {reservation.status === '2' && (
                          <span
                            className="account__general__table__body__td__status__available"
                          >Terminée
                          </span>
                        )}
                        {reservation.status === '3' && (
                          <span
                            className="account__general__table__body__td__status__refused"
                          >Refusée
                          </span>
                        )}
                        {reservation.status === '4' && (
                          <span
                            className="account__general__table__body__td__status__canceled"
                          >Annulée
                          </span>
                        )}
                      </td>
                      <td className="account__general__table__body__td account__general__table__body__td--button">
                        <button
                          className="account__general__table__body__td__button__eye account__general__table__body__td__button"
                          type="button"
                          title="voir plus"
                          data-id={reservation.id}
                          onClick={handleModalDetail}
                        >
                          <i className="fas fa-eye" />
                        </button>
                        <button
                          className="account__general__table__body__td__button__remove account__general__table__body__td__button"
                          type="button"
                          title="annuler"
                          data-id={reservation.id}
                          data-status={reservation.status}
                          onClick={handleModalReservation}
                        >
                          <i className="fas fa-trash-alt" />
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
              <h2 className="account__general__subtitle">Mes dernières offres</h2>
              <table className="account__general__table offer__account__general__table">
                <tbody className="account__general__table__body ">
                  {offers.map((offerData) => (
                    <tr className="account__general__table__body__tr offer__account__general__table__body__tr" key={offerData.id}>
                      <td
                        className="account__general__table__body__td account__general__table__body__td--left offer__account__general__table__body__tr"
                      >{offerData.status === '1' ? (
                        <Link
                          to={`/recherche/jeux/${offerData.id}/${slugify(offerData.title, { lower: true })}`}
                          className="account__general__table__body__td__link"
                        >{truncateText(offerData.title, 24)}
                        </Link>
                      ) : (truncateText(offerData.title, 24))}
                      </td>
                      <td className="account__general__table__body__td account__general__table__body__td--status">

                        {(offerData.status === '1' && offerData.is_available) && <span className="account__general__table__body__td__status__available">Disponible</span>}

                        {(offerData.status === '1' && !offerData.is_available) && (
                          offerData.reservations.length > 0 ? (
                            <span
                              className="account__general__table__body__td__status__unavailable"
                            >Réservée
                            </span>
                          ) : (
                            <span
                              className="account__general__table__body__td__status__unavailable"
                            >Non disponible
                            </span>
                          )
                        )}
                        {offerData.status === '0' && (
                          <span
                            className="account__general__table__body__td__status__pending"
                          >En attente
                          </span>
                        )}
                      </td>
                      <td className="account__general__table__body__td account__general__table__body__td--button">
                        {(offerData.status === '1' && (offerData.is_available || (!offerData.is_available && offerData.reservations.length === 0))) && (
                          <Link
                            className="account__general__table__body__td__button__pencil"
                            to={`compte/offres/${offerData.id}`}
                            title="Modifier l'offre"
                          >
                            <i className="far fa-pencil-alt" />
                          </Link>
                        )}
                        {(offerData.status === '0' || (offerData.status === '1' && (offerData.is_available || (!offerData.is_available && offerData.reservations.length === 0)))) && (
                        <button
                          type="button"
                          className="account__general__table__body__td__button"
                          title="Supprimer l'offre"
                          data-id={offerData.id}
                          onClick={offerData.is_available ? handleModalOffer : handleModalOfferImpossible}
                        >
                          <i className="fas fa-trash-alt account__general__table__body__td__button--remove" />
                        </button>
                        )}
                        {(offerData.status === '1' && (!offerData.is_available && offerData.reservations.length > 0)) && (
                        <button
                          type="button"
                          className="account__general__table__body__td__button"
                          title="Vous ne pouvez pas supprimer une offre qui est réservée"
                          onClick={handleRemoveImpossible}
                        >
                          <i className="fas fa-trash-alt account__general__table__body__td__button--disabled" />
                        </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {offers.length === 0 ? <i className="fas fa-chess-bishop account__general__icon" /> : <Link to="/compte/offres" className="account__general__button global-button global-button--light"><i className="far fa-eye" /> Voir plus</Link>}
            </div>

            {/* Ma liste de souhaits */}
            <div className="account__general wish-list">
              <h2 className="account__general__subtitle">Ma liste de souhaits</h2>
              <div className="account__general__table__test">
                <table className="account__general__table">
                  <tbody className="account__general__table__body">
                    {favorites.map((favorite) => (
                      <tr className="account__general__table__body__tr" key={favorite.id}>
                        <td className="account__general__table__body__td
                              account__general__table__body__td--left"
                        >
                          <Link
                            to={`/recherche/jeux/${favorite.offer.id}/${slugify(favorite.offer.title, { lower: true })}`}
                            target="_blank"
                            className="account__general__table__body__td__link"
                          >{truncateText(favorite.offer.title, 24)}
                          </Link>
                        </td>
                        <td className="account__general__table__body__td account__general__table__body__td--status">
                          {(favorite.offer.is_available && favorite.offer.status === '1') ? (
                            <span
                              className="account__general__table__body__td__status__available"
                            >Disponible
                            </span>
                          ) : (
                            <span
                              className="account__general__table__body__td__status__unavailable"
                            >Non disponible
                            </span>
                          )}
                        </td>
                        <td className="account__general__table__body__td account__general__table__body__td--button">
                          {((!favorite.offer.is_available && favorite.offer.status === '1') || favorite.offer.status === '0') && (
                            <button
                              data-id={favorite.id}
                              data-notify={favorite.notify_when_available}
                              type="button"
                              className="account__general__table__body__td__button"
                              onClick={handleFavorite}
                            >
                              {favorite.notify_when_available ? <i className="fas fa-bell account__general__table__body__td__button--bell" /> : <i className="fas fa-bell-slash account__general__table__body__td__button--bellslash" />}
                            </button>
                          )}
                          {/* {(favorite.offer.status === '0') && (
                            <button
                              data-id={favorite.id}
                              data-notify={favorite.notify_when_available}
                              type="button"
                              className="account__general__table__body__td__button"
                              onClick={handleFavorite}
                            >
                              {favorite.notify_when_available ? <i className="fas fa-bell account__general__table__body__td__button--bell" /> : <i className="fas fa-bell-slash account__general__table__body__td__button--bellslash" />}
                            </button>
                          )} */}
                          <button
                            type="button"
                            className="account__general__table__body__td__button account__general__table__body__td__button__remove"
                            title="retirer de ma liste de souhait"
                            onClick={removeFavorite}
                            data-id={favorite.id}
                          >
                            <i className="fas fa-times" />
                          </button>
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
                    <li className="account__profil__left__list__content">
                      <span className={(user.user.lastname === '') ? 'account__profil__left__list__content__bold empty-profil' : 'account__profil__left__list__content__bold'}>
                        Nom :
                      </span>
                      {user.user.lastname}
                    </li>
                    <li className="account__profil__left__list__content">
                      <span className={user.user.firstname === '' ? 'account__profil__left__list__content__bold empty-profil' : 'account__profil__left__list__content__bold'}>
                        Prénom :
                      </span>
                      {user.user.firstname}
                    </li>
                    <li className="account__profil__left__list__content">
                      <span className="account__profil__left__list__content__bold">
                        Pseudo :
                      </span> {user.user.username}
                    </li>
                    <li className="account__profil__left__list__content">
                      <span className="account__profil__left__list__content__bold">
                        Adresse email :
                      </span> {user.user.email}
                    </li>
                    <li className="account__profil__left__list__content">
                      <span className={user.user.phone === '' ? 'account__profil__left__list__content__bold empty-profil' : 'account__profil__left__list__content__bold'}>
                        Téléphone :
                      </span>{user.user.phone}
                    </li>
                    <ul className="account__profil__left__list__content">
                      <span className={user.user.address === '' ? 'account__profil__left__list__content__bold empty-profil' : 'account__profil__left__list__content__bold'}>Adresse postale : </span>
                      <li>{user.user.adress}</li>
                      <li>{user.user.postal_code} {user.user.city}</li>
                    </ul>
                  </ul>
                  <Link to="/compte/profil" className="account__profil__left__link ">Modifier</Link>
                </div>
                <div className="account__profil__right">
                  {(user.user.picture === '' || user.user.picture === null) && <i className="far fa-portrait account__profil__right__picture" />}
                  {(user.user.picture !== '' && user.user.picture !== null) && <img src={`http://ec2-34-205-156-142.compute-1.amazonaws.com/images/users/${user.user.picture}`} alt="" />}
                </div>
              </div>
            </div>
          </div>
          <p className="dashboard__legend">
            <i className="fas fa-bell account__general__table__body__td__button--bell" /> : Notifie par mail lorsque l'offre est disponible.
          </p>
          <p className="dashboard__legend dashboard__legend__disable">
            <i className="fas fa-bell-slash account__general__table__body__td__button--bellslash" /> : Les notifications sont désactivées.
          </p>
        </div>
      )}
    </>
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
  saveIdFavorite: PropTypes.func.isRequired,
  requestIsLoad: PropTypes.bool.isRequired,
  setRequestIsLoad: PropTypes.func.isRequired,
  updateNotifyFavorite: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  saveOfferId: PropTypes.func.isRequired,
  saveIdReservation: PropTypes.func.isRequired,
  displayAlert: PropTypes.func.isRequired,
  changeOfferIsLoad: PropTypes.func.isRequired,
};

export default Account;
