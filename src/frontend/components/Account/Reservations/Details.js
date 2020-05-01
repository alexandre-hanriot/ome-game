import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate, slugifyId } from 'src/utils/selectors';
import Loader from 'src/frontend/components/Loader';

const Details = ({
  reservation, fetchUser, user, saveUser,
}) => {
  useEffect(() => {
    fetchUser(reservation.offer.userId);

    return () => {
      saveUser({});
    };
  }, []);

  const userIsLoad = 'id' in user;

  return (
    <div className="reservations__details">
      <div className="reservations__details__list">
        <h1>{reservation.offer.title}</h1>
        {!userIsLoad && <Loader withMargin={false} />}
        {userIsLoad && (
          <ul>
            <li className="reservations__details__list__item">
              <span className="reservations__details__list__item__bold">Propriétaire :</span> {user.display_name ? `${user.fistname} ${user.lastname}` : user.username}
            </li>
            {reservation.status === '1' && (
              <>
                <li className="reservations__details__list__item">
                  <span className="reservations__details__list__item__bold">Adresse email :</span> {user.email}
                </li>
                {(user.address !== null || user.postal_code !== null || user.city !== null) && (
                  <li className="reservations__details__list__item">
                    <span className="reservations__details__list__item__bold">Adresse postale :</span> {user.address !== null ? `${user.address}, ` : ''} {user.postal_code !== null ? user.postal_code : ''} {user.city !== null ? user.city : ''}
                  </li>
                )}
                {user.phone !== null && (
                <li className="reservations__details__list__item">
                  <span className="reservations__details__list__item__bold">Téléphone :</span> {user.phone}
                </li>
                )}
              </>
            )}
            <li className="reservations__details__list__item">
              <span className="reservations__details__list__item__bold">Date de mise en ligne de l'offre :</span> {formatDate(reservation.offer.createdAt)}
            </li>
            <li className="reservations__details__list__item">
              <span className="reservations__details__list__item__bold">Date de reservation :</span> {formatDate(reservation.createdAt)}
            </li>
            <li className="reservations__details__list__item">
              <span className="reservations__details__list__item__bold">Etat de la reservation :</span>{reservation.status === '0' && ' En attente de validation par le propriétaire'}{reservation.status === '1' && ' Accepté'}{reservation.status === '2' && ' Terminée'}{reservation.status === '3' && ' Refusée'}{reservation.status === '4' && ' Annulée'}
            </li>
          </ul>
        )}
        {userIsLoad && (
          <Link className="reservations__details__link" to={`/recherche/jeux/${reservation.offerId}/${slugifyId(reservation.offer.title)}`} target="_blank">Aller voir l'offre</Link>
        )}
      </div>
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
