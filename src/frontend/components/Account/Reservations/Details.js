import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Details = ({ displayModal }) => (
  <div className="wrapper reservations__details">
    <div className="reservations__details__list">
      <h1 className="reservations__details__title">Nom de l'offre</h1>
      <ul>
        <li className="reservations__details__list__item">
          <span className="reservations__details__list__item__bold">Propriétaire :</span> pseudo
        </li>
        <li className="reservations__details__list__item">
          <span className="reservations__details__list__item__bold">Date de mise en ligne de l'offre :</span> 09/04/2020
        </li>
        <li className="reservations__details__list__item">
          <span className="reservations__details__list__item__bold">Date de reservation :</span> 09/04/2020
        </li>
        <li className="reservations__details__list__item">
          <span className="reservations__details__list__item__bold">Etat de la reservation :</span> en attente de réponse du propriétaire
        </li>
      </ul>
    </div>
    <div className="reservations__details__buttons">
      <button className="reservations__details__buttons__button" type="button" title="fermer la fenêtre" onClick={displayModal}><i className="fas fa-times" /> </button>
      <Link className="reservations__details__link" to="/recherche/jeux/1-toto">Aller voir l'offre</Link>
    </div>
  </div>
);

Details.propTypes = {
  displayModal: PropTypes.func.isRequired,
};

export default Details;
