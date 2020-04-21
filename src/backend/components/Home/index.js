/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTitle } from 'src/hooks/useTitle';
import { truncateText } from 'src/utils/selectors';

import './home.scss';

const Home = ({
  fetchAllOffers,
  offers,
}) => {
  useTitle('Administration');

  useEffect(() => {
    fetchAllOffers();
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
          <ul className="admin-dashboard__users">
            <li className="admin-dashboard__users__item">
              <div className="admin-dashboard__users__item__nickname">Pseudo</div>
              <div className="admin-dashboard__users__item__date">21/04/2020</div>
              <div className="admin-dashboard__users__item__status admin-dashboard__users__item__status--active"><i className="fas fa-check-circle" title="Validé" /></div>
              <div className="admin-dashboard__users__item__action"><a href="/"><i className="fas fa-search" /></a></div>
            </li>
            <li className="admin-dashboard__users__item">
              <div className="admin-dashboard__users__item__nickname">Jean-luc</div>
              <div className="admin-dashboard__users__item__date">20/04/2020</div>
              <div className="admin-dashboard__users__item__status admin-dashboard__users__item__status--active"><i className="fas fa-check-circle" title="Validé" /></div>
              <div className="admin-dashboard__users__item__action"><a href="/"><i className="fas fa-search" /></a></div>
            </li>
            <li className="admin-dashboard__users__item">
              <div className="admin-dashboard__users__item__nickname">Marcel de bouc</div>
              <div className="admin-dashboard__users__item__date">03/04/2020</div>
              <div className="admin-dashboard__users__item__status admin-dashboard__users__item__status--wait"><i className="fas fa-dot-circle" title="En attente de validation" /></div>
              <div className="admin-dashboard__users__item__action"><a href="/"><i className="fas fa-search" /></a></div>
            </li>
          </ul>
        </div>

        <div className="admin-dashboard__container__block">
          <h2 className="admin-dashboard__container__block__title">Dernières offres</h2>
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
        </div>

        <div className="admin-dashboard__container__block">
          <h2 className="admin-dashboard__container__block__title">Dernières réservations</h2>
          <ul className="admin-dashboard__reservations">
            <li className="admin-dashboard__reservations__item">
              <div className="admin-dashboard__reservations__item__title">Mon offre numéro 1</div>
              <div className="admin-dashboard__reservations__item__status admin-dashboard__reservations__item__status--accept"><i className="fas fa-check-circle" title="Validée" /></div>
              <div className="admin-dashboard__reservations__item__action"><a href="/"><i className="fas fa-search" /></a></div>
            </li>
            <li className="admin-dashboard__reservations__item">
              <div className="admin-dashboard__reservations__item__title">Offre 2403 du mois de février</div>
              <div className="admin-dashboard__reservations__item__status admin-dashboard__reservations__item__status--wait"><i className="fas fa-dot-circle" title="En attente de validation" /></div>
              <div className="admin-dashboard__reservations__item__action"><a href="/"><i className="fas fa-search" /></a></div>
            </li>
            <li className="admin-dashboard__reservations__item">
              <div className="admin-dashboard__reservations__item__title">Nouveau jeu Star wars</div>
              <div className="admin-dashboard__reservations__item__status admin-dashboard__reservations__item__status--refuse"><i className="fas fa-times-circle" title="Refusée" /></div>
              <div className="admin-dashboard__reservations__item__action"><a href="/"><i className="fas fa-search" /></a></div>
            </li>
          </ul>
        </div>

        <div className="admin-dashboard__container__block">
          <h2 className="admin-dashboard__container__block__title">Derniers jeux</h2>
          <ul className="admin-dashboard__games">
            <li className="admin-dashboard__games__item">
              <div className="admin-dashboard__games__item__title">Star Wars (2019)</div>
              <div className="admin-dashboard__games__item__action"><a href="/"><i className="fas fa-search" /></a></div>
            </li>
            <li className="admin-dashboard__games__item">
              <div className="admin-dashboard__games__item__title">Times stories (2011)</div>
              <div className="admin-dashboard__games__item__action"><a href="/"><i className="fas fa-search" /></a></div>
            </li>
            <li className="admin-dashboard__games__item">
              <div className="admin-dashboard__games__item__title">This war of mine (2018)</div>
              <div className="admin-dashboard__games__item__action"><a href="/"><i className="fas fa-search" /></a></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  fetchAllOffers: PropTypes.func.isRequired,
  offers: PropTypes.array.isRequired,
};

export default Home;
