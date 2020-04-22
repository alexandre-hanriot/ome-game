/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTitle } from 'src/hooks/useTitle';
import { truncateText, formatDate } from 'src/utils/selectors';
import Loader from 'src/frontend/components/Loader';

import './home.scss';

const Home = ({
  fetchAllOffers,
  offers,
  fetchAllUsers,
  users,
  fetchAllGames,
  games,
  fetchAllReservations,
  reservations,
}) => {
  useTitle('Administration');

  useEffect(() => {
    fetchAllOffers();
    fetchAllUsers();
    fetchAllGames({
      orderby: 'id',
      sortby: 'DESC',
      status: '0',
    });
    fetchAllReservations();
  }, []);

  return (
    <div className="wrapper admin-dashboard">
      <div className="admin-dashboard__breadcrumb">
        Accueil > Tableau de bord
      </div>

      <h1>Tableau de bord</h1>

      <div className="admin-dashboard__container">
        <div className="admin-dashboard__container__block">
          <h2 className="admin-dashboard__container__block__title">Derniers utilisateurs</h2>
          {users.length === 0 && <Loader />}
          {users.length > 0 && (
            <ul className="admin-dashboard__users">
              {users.map((user) => {
                const statusClass = classNames('admin-dashboard__users__item__status', {
                  'admin-dashboard__users__item__status--wait': user.status === '0',
                  'admin-dashboard__users__item__status--active': user.status === '1',
                });
                const statusIconClass = classNames('fas', {
                  'fa-dot-circle': user.status === '0',
                  'fa-check-circle': user.status === '1',
                });
                return (
                  <li className="admin-dashboard__users__item" key={user.id}>
                    <div className="admin-dashboard__users__item__nickname">{truncateText(user.username, 25)}</div>
                    <div className="admin-dashboard__users__item__date">{formatDate(user.createdAt, true)}</div>
                    <div className={statusClass}><i className={statusIconClass} title={user.status === '0' ? 'En attente de validation' : 'Validée'} /></div>
                    <div className="admin-dashboard__users__item__action"><a href={`/admin/users/${user.id}`}><i className="fas fa-search" /></a></div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="admin-dashboard__container__block">
          <h2 className="admin-dashboard__container__block__title">Dernières offres</h2>
          {offers.length === 0 && <Loader />}
          {offers.length > 0 && (
            <ul className="admin-dashboard__offers">
              {offers.map((offer) => {
                const statusClass = classNames('admin-dashboard__offers__item__status', {
                  'admin-dashboard__offers__item__status--wait': offer.status === '0',
                  'admin-dashboard__offers__item__status--active': offer.status === '1',
                });
                const statusIconClass = classNames('fas', {
                  'fa-dot-circle': offer.status === '0',
                  'fa-check-circle': offer.status === '1',
                });
                const disponibilityClass = classNames('admin-dashboard__offers__item__disponibility', {
                  'admin-dashboard__offers__item__disponibility--no': !offer.is_available,
                  'admin-dashboard__offers__item__disponibility--yes': offer.is_available,
                });
                const disponibilityIconClass = classNames('fas', {
                  'fa-times-circle': !offer.is_available,
                  'fa-check-circle': offer.is_available,
                });
                return (
                  <li className="admin-dashboard__offers__item" key={offer.id}>
                    <div className="admin-dashboard__offers__item__title">{truncateText(offer.title, 35)}</div>
                    <div className={statusClass}><i className={statusIconClass} title={offer.status === '0' ? 'En attente de validation' : 'Validée'} /></div>
                    <div className={disponibilityClass}><i className={disponibilityIconClass} title={offer.is_available ? 'Disponible' : 'Non disponible'} /></div>
                    <div className="admin-dashboard__offers__item__action"><a href={`/admin/offers/${offer.id}`}><i className="fas fa-search" /></a></div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="admin-dashboard__container__block">
          <h2 className="admin-dashboard__container__block__title">Dernières réservations</h2>
          {reservations.length === 0 && <Loader />}
          {reservations.length > 0 && (
            <ul className="admin-dashboard__offers">
              {reservations.map((reservation) => {
                const statusClass = classNames('admin-dashboard__reservations__item__status', {
                  'admin-dashboard__reservations__item__status--wait': reservation.status === '0',
                  'admin-dashboard__reservations__item__status--accept': reservation.status === '1',
                  'admin-dashboard__reservations__item__status--refuse': reservation.status === '2',
                });
                const statusIconClass = classNames('fas', {
                  'fa-dot-circle': reservation.status === '0',
                  'fa-check-circle': reservation.status === '1',
                  'fa-times-circle': reservation.status === '2',
                });

                let statusText = 'En attente de validation';
                if (reservation.status === '1') {
                  statusText = 'Validée';
                } else if (reservation.status === '2') {
                  statusText = 'Refusée';
                }

                return (
                  <li className="admin-dashboard__reservations__item" key={reservation.id}>
                    <div className="admin-dashboard__reservations__item__title">{reservation.offerId}</div>
                    <div className={statusClass}><i className={statusIconClass} title={statusText} /></div>
                    <div className="admin-dashboard__reservations__item__action"><a href={`/admin/reservations/${reservation.id}`}><i className="fas fa-search" /></a></div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="admin-dashboard__container__block">
          <h2 className="admin-dashboard__container__block__title">Derniers jeux</h2>
          {games.length === 0 && <Loader />}
          {games.length > 0 && (
          <ul className="admin-dashboard__games">
            {games.map((game) => (
              <li className="admin-dashboard__games__item" key={game.id}>
                <div className="admin-dashboard__games__item__title">{truncateText(game.name, 40)}</div>
                <div className="admin-dashboard__games__item__action"><a href={`/admin/games/${game.id}`}><i className="fas fa-search" /></a></div>
              </li>
            ))}
          </ul>
          )}
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  fetchAllOffers: PropTypes.func.isRequired,
  offers: PropTypes.array.isRequired,
  fetchAllUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  fetchAllGames: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
  fetchAllReservations: PropTypes.func.isRequired,
  reservations: PropTypes.array.isRequired,
};

export default Home;