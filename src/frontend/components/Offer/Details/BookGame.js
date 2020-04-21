import React from 'react';
import PropTypes from 'prop-types';
import './details.scss';

const BookGame = ({
  offer,
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
        <p className="modal__bookGame__content__p1"><span>Offre :</span> {offer.title}</p>
        <p className="modal__bookGame__content__p2"><span>Type :</span> {offer.type === '0' ? 'Prêt' : 'Location'} {offer.price === 0 ? '' : `(${offer.price}€)`}</p>
        <p className="modal__bookGame__content__p1"><span>Jeu :</span> {offer.game.name}</p>
        <p className="modal__bookGame__content__p3">Une demande sera faite auprès du propriétaire du jeu et vous recevrez une réponse dans les plus brefs délais.</p>
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
  offer: PropTypes.object.isRequired,
};

export default BookGame;
