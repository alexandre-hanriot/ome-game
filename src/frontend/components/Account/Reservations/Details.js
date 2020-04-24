import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Details = ({ fetchOneReservation, data }) => {
  useEffect(() => {
    fetchOneReservation();
  }, []);
  console.log(data);
  return (
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
            <span className="reservations__details__list__item__bold">Date de reservation :</span> {data.createdAt}
          </li>
          <li className="reservations__details__list__item">
            <span className="reservations__details__list__item__bold">Etat de la reservation :</span>{data.status === '0' && ' en attente de réponse du propriétaire'}{data.status === '1' && ' en cours de réservation'}{data.status === '2' && ' en cours'}{data.status === '3' && ' terminée'}{data.status === '4' && ' annulée'}
          </li>
        </ul>
      </div>
      <Link className="reservations__details__link" to={`/recherche/jeux/${data.offerId}/toto`} target="_blank">Aller voir l'offre</Link>
    </div>
  );
};

Details.propTypes = {
  fetchOneReservation: PropTypes.func.isRequired,
  data: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      offer: PropTypes.objectOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  ).isRequired,
};

export default Details;
