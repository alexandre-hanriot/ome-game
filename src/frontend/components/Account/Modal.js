import React from 'react';
import PropTypes from 'prop-types';
import './account.scss';

const Modal = ({ displayModal, displayAlert }) => {
  const handleValidate = () => {
    displayAlert('L\'élément à bien été supprimé');
    displayModal();
  };
  return (
    <div className="account__modal">
      <h1>Confirmation</h1>
      <div className="account__modal__top">
        <p className="account__modal__top__content">Etes-vous sûr de vouloir supprimer ? </p>
      </div>
      <div className="account__modal__bottom">
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
      </div>
    </div>
  );
};

Modal.propTypes = {
  displayModal: PropTypes.func.isRequired,
  displayAlert: PropTypes.func.isRequired,
};

export default Modal;
