import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from 'src/frontend/containers/Modal';
import ConfirmSupp from 'src/frontend/containers/Account/Modal';
import { useTitle } from 'src/hooks/useTitle';
import { formatDate } from 'src/utils/selectors';
import Details from 'src/frontend/containers/Account/Reservations/Details';
import Loader from 'src/frontend/components/Loader';
import classNames from 'classnames';

import './reservations.scss';
import noimage from 'src/assets/images/noimage_150.jpg';

const Reservations = ({
  showModal,
  displayModal,
  fetchReservations,
  saveIdReservation,
  data,
  isReservationsLoad,
  clearReservations,
}) => {
  useTitle('Mes réservations');

  const handleModal = (e) => {
    const { id } = e.currentTarget.dataset;
    const reservation = data.filter((resa) => resa.id.toString() === id.toString());
    displayModal('reservation', { reservation: reservation[0] });
  };

  const handleModalSupp = (e) => {
    const { id, status } = e.currentTarget.dataset;
    saveIdReservation(id);
    if (status === '0' || status === '4' || status === '3') {
      saveIdReservation(id);
      displayModal('modalReservation');
    }
    if (status === '1' || status === '2') {
      displayModal('modalReservationImpossible');
    }
  };

  useEffect(() => {
    fetchReservations();
    return () => {
      clearReservations();
    };
  }, []);

  return (
    <div className="wrapper reservations">
      {!isReservationsLoad && <Loader />}
      {isReservationsLoad && (
        <>
          {(showModal === 'modalReservation' || showModal === 'modalReservationImpossible') && (
          <Modal content={<ConfirmSupp />} />
          )}
          {showModal === 'reservation' && (
          <Modal content={<Details reservations={data} />} />
          )}
          <div className="reservations__breadcrumb">
            <Link to="/">Accueil ></Link>
            <Link to="/compte"> Tableau de bord ></Link>
            <Link to="/compte/reservations"> Mes reservations</Link>
          </div>
          <h1 className="reservations__title">Mes réservations</h1>
          <p className="reservations__title__infos">Si votre réservation est acceptée, vous pouvez retrouver les informations de contact en cliquant sur le bouton "Voir plus".</p>
          <ul>
            {data.map((reservation) => {
              const statusClass = classNames('reservations__container__item__left__text__status', {
                'reservations__container__item__left__text__status--pending': reservation.status === '0',
                'reservations__container__item__left__text__status--available': reservation.status === '1',
                'reservations__container__item__left__text__status--finished': reservation.status === '2',
                'reservations__container__item__left__text__status--refused': reservation.status === '3',
                'reservations__container__item__left__text__status--canceled': reservation.status === '4',
              });

              let statusText = 'En attente de validation';
              switch (reservation.status) {
                case '1':
                  statusText = 'Acceptée';
                  break;
                case '2':
                  statusText = 'Terminée';
                  break;
                case '3':
                  statusText = 'Refusée';
                  break;
                case '4':
                  statusText = 'Annulée';
                  break;
                default:
                  statusText = 'En attente de validation';
              }
              return (
                <li className="reservations__container" key={reservation.id}>
                  <div className="reservations__container__item">
                    <div className="reservations__container__item__left">
                      <img className="reservations__container__item__left__picture" src={reservation.offer.image === null ? noimage : `http://ec2-34-205-156-142.compute-1.amazonaws.com/images/offers/${reservation.offer.image}`} alt="" />
                      <div className="reservations__container__item__left__text">
                        <div className="reservations__container__item__left__text__title">
                          <h2 className="reservations__container__item__left__text__subtitle">{reservation.offer.title}</h2>
                          <h3 className="reservations__container__item__left__text__third">Jeu : {reservation.offer.game.name}</h3>
                          <p className="reservations__container__item__left__text__date">Réservée le {formatDate(reservation.createdAt)}</p>
                        </div>
                        <div className={statusClass}>{statusText}</div>
                      </div>
                    </div>
                    <div className="reservations__container__item__right">
                      <div className="reservations__container__item__right__button__global">
                        <div>
                          <button className="global-button global-button--light" type="button" onClick={handleModal} data-id={reservation.id}>
                            <i className="far fa-eye" /><span>Voir plus</span>
                          </button>
                        </div>
                        <div>
                          <button
                            className="global-button global-button--light cancel"
                            type="button"
                            data-id={reservation.id}
                            data-status={reservation.status}
                            onClick={handleModalSupp}
                          >
                            <i className="fas fa-times" /><span>Annuler</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

Reservations.propTypes = {
  showModal: PropTypes.string.isRequired,
  displayModal: PropTypes.func.isRequired,
  fetchReservations: PropTypes.func.isRequired,
  saveIdReservation: PropTypes.func.isRequired,
  isReservationsLoad: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  clearReservations: PropTypes.func.isRequired,
};
export default Reservations;
