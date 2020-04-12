import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'src/frontend/containers/Alert';
import './details.scss';

const BookGame = ({ displayModal, displayAlert, showAlert }) => {
  const closeModal = () => {
    displayModal('');
  };

  const validateAlert = () => {
    displayAlert('La demande a été enregistrée, et sera traité dans les plus bref délais', true);
    displayModal('');
  };

  return (
    <div className="modal__bookGame">
      {showAlert && <Alert />}
      <h1 className="modal__bookGame__title">Demande de réservation</h1>
      <div className="modal__bookGame__content">
        <p className="modal__bookGame__content__p1"><span>Offre :</span> nom du jeu</p>
        <p className="modal__bookGame__content__p2"><span>Type :</span> Location (10€)</p>
        <p className="modal__bookGame__content__p3">Une demande sera faite auprès du propriétaire du jeu...</p>
      </div>
      <div className="modal__bookGame__button">
        <button
          type="button"
          className="global-button modal__bookGame__button__cancel"
          onClick={closeModal}
        >Annuler
        </button>
        <button
          type="button"
          className="global-button modal__bookGame__button__validate"
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
  showAlert: PropTypes.bool.isRequired,
};

export default BookGame;
