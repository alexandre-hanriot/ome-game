import React from 'react';
import PropTypes from 'prop-types';

import './modal.scss';

const Modal = ({ displayModal, content }) => (
  <>
    <div className="modal-background"> </div>
    <div className="modal">
      <button className="modal__close global-button" type="button" title="Fermer la fenêtre" onClick={displayModal}><i className="fas fa-times" /> </button>
      {content}
    </div>
  </>
);

Modal.propTypes = {
  content: PropTypes.string.isRequired,
  displayModal: PropTypes.func.isRequired,
};

export default Modal;
