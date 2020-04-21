import React from 'react';
import PropTypes from 'prop-types';
import './account.scss';

const Modal = ({
  displayModal,
  displayAlert,
  showModal,
  deleteReservation,
  deleteOffer,
}) => {
  const handleValidate = () => {
    if (showModal === 'modalReservation') {
      deleteReservation();
      displayAlert('L\'élément à bien été supprimé');
    }
    if (showModal === 'modalOffer') {
      deleteOffer();
      displayAlert('L\'élément à bien été supprimé');
    }
    displayModal();
  };
  console.log(showModal);
  return (
    <div className="account__modal">
      <h1>Confirmation</h1>
      <div className="account__modal__top">
        <p className="account__modal__top__content">
          {(showModal === 'modalReservation') && 'Etes-vous sûr de vouloir annuler cette réservation ?'}
          {showModal === 'modalOffer' && ('Etes-vous sûr de vouloir supprimer cette offre ?')}
          {showModal === 'modalOfferImpossible' && 'Vous ne pouvez pas supprimer une offre qui est en cours de réservation'}
          {showModal === 'modalReservationImpossible' && 'Vous ne pouvez pas annuler une réservation qui est en court'}
        </p>
      </div>
      <div className="account__modal__bottom">
        {(showModal === 'modalReservation' || showModal === 'modalOffer') && (
          <>
            <button
              className="account__modal__bottom__cancel"
              type="button"
              title="fermer la fenêtre"
              onClick={displayModal}
            >
              Annuler
            </button>
            <button
              className="account__modal__bottom__validate"
              type="button"
              title="fermer la fenêtre"
              onClick={handleValidate}
            >
              Valider
            </button>
          </>
        )}

        {(showModal === 'modalOfferImpossible' || showModal === 'modalReservationImpossible') && (
          <button
            className="account__modal__bottom__cancel"
            type="button"
            title="fermer la fenêtre"
            onClick={handleValidate}
          >
            Ok
          </button>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  displayModal: PropTypes.func.isRequired,
  displayAlert: PropTypes.func.isRequired,
  showModal: PropTypes.string.isRequired,
  deleteReservation: PropTypes.func.isRequired,
  deleteOffer: PropTypes.func.isRequired,
};

export default Modal;
