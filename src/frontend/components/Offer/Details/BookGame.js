import React from 'react';
import PropTypes from 'prop-types';
import './details.scss';

const BookGame = ({
  displayModal,
  displayAlert,
  addReservation,
  isLogged,
}) => {
  const closeModal = () => {
    displayModal('');
  };

  const validateAlert = () => {
    if (isLogged) {
      addReservation();
      displayAlert('La demande a été enregistrée et sera traitée dans les plus brefs délais', true);
    }
    else {
      displayAlert('Vous devez être connecté');
    }
    displayModal('');
  };

  return (
    <div className="modal__bookGame">
      <h1 className="modal__bookGame__title">Demande de réservation</h1>
      <div className="modal__bookGame__content">
        <p className="modal__bookGame__content__p1"><span>Offre :</span> nom du jeu</p>
        <p className="modal__bookGame__content__p2"><span>Type :</span> Location (10€)</p>
        <p className="modal__bookGame__content__p3">Une demande sera faite auprès du propriétaire du jeu...</p>
      </div>
      <div className="modal__bookGame__button">
        <button
          type="button"
          className="modal__bookGame__button__cancel global-button"
          onClick={closeModal}
        >Annuler
        </button>
        <button
          type="button"
          className="modal__bookGame__button__validate global-button"
          onClick={validateAlert}
        >Valider
        </button>
      </div>
    </div>
  );
};

BookGame.propTypes = {
  displayModal: PropTypes.func.isRequired,
  displayAlert: PropTypes.func.isRequired,
  addReservation: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
};

export default BookGame;
