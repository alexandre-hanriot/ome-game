import React from 'react';
import { Link } from 'react-router-dom';

const Details = () => (
  <div className="reservations__details">
    <div className="reservations__details__list">
      <h1>Nom de l'offre</h1>
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
    <Link className="reservations__details__link" to="/recherche/jeux/1-toto" target="_blank">Aller voir l'offre</Link>
  </div>
);

export default Details;
