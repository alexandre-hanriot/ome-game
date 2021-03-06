import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from 'src/utils/selectors';
import './offers.scss';

const ModalRequest = ({
  displayModal,
  displayAlert,
  showModal,
  urlId,
  username,
  allOffers,
  saveIdReservation,
  updateStatusReservation,
  updateValidateReservation,
  updateStatusOffer,
  updateStatusFinishedReservation,
}) => {
  const offers = allOffers.filter((offer) => {
    if (offer.id.toString() === urlId.toString()) {
      return true;
    }
  });

  const handleValidate = (e) => {
    const { id } = e.currentTarget.dataset;
    saveIdReservation(id);
    updateValidateReservation();
    displayAlert(`La réservation à été validé, un mail sera envoyé à ${username}`);

    displayModal();
  };
  const handleRefused = (e) => {
    const { id } = e.currentTarget.dataset;
    saveIdReservation(id);
    // saveStatusReservation(status);
    updateStatusReservation();
  };
  const handleFinished = () => {
    updateStatusOffer();
    updateStatusFinishedReservation();
    displayModal();
    displayAlert('La réservation de votre jeu est terminée');
  };

  return (
    <div className="account__modal">
      {showModal === 'modalRequest' && (
        <h1>Demande de réservation</h1>
      )}
      {showModal === 'modalInProgressReservation' && (
        <h1>Réservation en cours</h1>
      )}
      {showModal === 'modalRequest' && (
        <h2 className="account__modal__subtitle">Vous avez {offers[0].reservations.length} demande de réservation(s)</h2>
      )}
      {showModal === 'modalInProgressReservation' && (
        <h2 className="account__modal__subtitle">Réservé par : {offers[0].reservations[0].user.username}</h2>
      )}
      <div className="account__modal__global">
        {showModal === 'modalRequest' && (
          offers[0].reservations.map((reservation) => (
            <div className="account__modal__reservation" key={reservation.id}>
              <div className="account__modal__top">
                <p className="account__modal__top__contents">
                  <span className="account__modal__top__content__span">Demande de : </span>{reservation.user.username}
                </p>
                <p className="account__modal__top__contents">
                  <span className="account__modal__top__content__span">Effectuée le : </span>{formatDate(reservation.createdAt)}
                </p>
              </div>
              <div className="account__modal__bottom">
                <button
                  className="account__modal__bottom__cancel"
                  type="button"
                  title="refuser la réservation"
                  data-id={reservation.id}
                  data-status={reservation.status}
                  onClick={handleRefused}
                >
                  refuser
                </button>
                <button
                  className="account__modal__bottom__validate"
                  type="button"
                  title="fermer la fenêtre"
                  data-id={reservation.id}
                  onClick={handleValidate}
                >
                  Valider
                </button>
              </div>
              {offers[0].reservations.length !== 1 && (
                <p className="account__modal__border" />
              )}
            </div>
          ))
        )}
        {showModal === 'modalInProgressReservation' && (
          <div className="account__modal__reservation">
            <div className="account__modal__top">
              <p className="account__modal__top__contents">
                <span className="account__modal__top__content__span">Acceptée le : </span> {formatDate(offers[0].reservations[0].updatedAt)}
              </p>
              <p className="account__modal__top__contents">
                <span className="account__modal__top__content__span"> {offers[0].reservations[0].user.display_name ? 'prenom nom' : 'pseudo'} : </span>
                {offers[0].reservations[0].user.display_name ? `${offers[0].reservations[0].user.firstname} ${offers[0].reservations[0].user.lastname}` : offers[0].reservations[0].user.username}
              </p>
              <p className="account__modal__top__contents">
                <span className="account__modal__top__content__span">email : </span> {offers[0].reservations[0].user.email}
              </p>
              <p className="account__modal__top__contents">
                <span className="account__modal__top__content__span">Telephone : </span> {offers[0].reservations[0].user.phone === null ? 'non renseigné' : offers[0].reservations[0].user.phone}
              </p>
            </div>
            <div className="account__modal__bottom">
              <button
                className="account__modal__bottom__finished"
                type="button"
                title="terminer la réservation"
                onClick={handleFinished}
              >
                Terminer la réservation
              </button>
            </div>
          </div>
        )}
      </div>
      {offers[0].reservations.length === 0 && (
        <h2>Vous n'avez plus aucune demande de réservations pour votre jeu</h2>
      )}
    </div>
  );
};

ModalRequest.propTypes = {
  displayModal: PropTypes.func.isRequired,
  displayAlert: PropTypes.func.isRequired,
  showModal: PropTypes.string.isRequired,
  username: PropTypes.string,
  allOffers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  urlId: PropTypes.string.isRequired,
  saveIdReservation: PropTypes.func.isRequired,
  updateStatusReservation: PropTypes.func.isRequired,
  updateValidateReservation: PropTypes.func.isRequired,
  updateStatusOffer: PropTypes.func.isRequired,
  updateStatusFinishedReservation: PropTypes.func.isRequired,
};

ModalRequest.defaultProps = {
  username: '',
};

export default ModalRequest;
