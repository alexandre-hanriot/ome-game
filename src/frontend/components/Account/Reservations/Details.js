import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate, slugifyId } from 'src/utils/selectors';

const Details = ({
  reservation, fetchUser, user, saveUser,
}) => {
  useEffect(() => {
    fetchUser(reservation.offer.userId);

    return () => {
      saveUser({});
    };
  }, []);

  return (
    <div className="reservations__details">
      <div className="reservations__details__list">
        <h1>{reservation.offer.title}</h1>
        <ul>
          <li className="reservations__details__list__item">
            <span className="reservations__details__list__item__bold">Propriétaire :</span> {user.display_name ? `${user.fistname} ${user.lastname}` : user.username}
          </li>
          <li className="reservations__details__list__item">
            <span className="reservations__details__list__item__bold">Date de mise en ligne de l'offre :</span> {formatDate(reservation.offer.createdAt)}
          </li>
          <li className="reservations__details__list__item">
            <span className="reservations__details__list__item__bold">Date de reservation :</span> {formatDate(reservation.createdAt)}
          </li>
          <li className="reservations__details__list__item">
            <span className="reservations__details__list__item__bold">Etat de la reservation :</span>{reservation.status === '0' && ' en attente de réponse du propriétaire'}{reservation.status === '1' && ' en cours de réservation'}{reservation.status === '2' && ' en cours'}{reservation.status === '3' && ' terminée'}{reservation.status === '4' && ' annulée'}
          </li>
        </ul>
      </div>
      <Link className="reservations__details__link" to={`/recherche/jeux/${reservation.offerId}/${slugifyId(reservation.offer.title)}`} target="_blank">Aller voir l'offre</Link>
    </div>
  );
};

Details.propTypes = {
  reservation: PropTypes.object.isRequired,
  fetchUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  saveUser: PropTypes.func.isRequired,
};

export default Details;
