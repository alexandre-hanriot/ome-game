import React from 'react';
import PropTypes from 'prop-types';
import './offers.scss';

const ModalRequest = ({
  displayModal,
  displayAlert,
  showModal,
  urlId,
  allOffers,
  saveIdReservation,
  updateStatusReservation,

}) => {
  const offers = allOffers.filter((offer) => {
    if (offer.id.toString() === urlId.toString()) {
      return true;
    }
  });
  console.log(offers);
  const handleValidate = () => {
    displayAlert('L\'élément à bien été supprimé');

    displayModal();
  };

  const handleRefused = (e) => {
    const { id, status } = e.currentTarget.dataset;
    saveIdReservation(id);
    // saveStatusReservation(status);
    updateStatusReservation();
    displayAlert('L\'élément à bien été supprimé');
  };
  console.log(showModal);
  return (
    <div className="account__modal">
      <h1>Demande de réservation</h1>
      <h2 className="account__modal__subtitle">Vous avez {offers[0].reservations.length} demande de réservation(s)</h2>
      <div className="account__modal__global">
        {offers[0].reservations.map((reservation) => (
          <>
            <div className="account__modal__reservation" key={reservation.id}>
              <div className="account__modal__top">
                <p className="account__modal__top__contents">
                  <span className="account__modal__top__content__span">Demande de : </span>{reservation.userId}
                </p>
                <p className="account__modal__top__contents">
                  <span className="account__modal__top__content__span">Effectuée le : </span>{reservation.createdAt}
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
                  onClick={handleValidate}
                >
                  Valider
                </button>
              </div>
              {offers[0].reservations.length !== 1 && (
                <p className="account__modal__border" />
              )}
            </div>
          </>
        ))}
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
  allOffers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  urlId: PropTypes.string.isRequired,
  saveIdReservation: PropTypes.func.isRequired,
  updateStatusReservation: PropTypes.func.isRequired,
};

export default ModalRequest;
