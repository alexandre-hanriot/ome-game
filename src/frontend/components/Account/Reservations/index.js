import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './reservations.scss';
import PropTypes from 'prop-types';
import Modal from 'src/frontend/containers/Modal';
import ConfirmSupp from 'src/frontend/containers/Account/Modal';
import { useTitle } from 'src/hooks/useTitle';
import Details from 'src/frontend/containers/Account/Reservations/Details';


const Reservations = ({
  showModal,
  displayModal,
  fetchReservations,
  saveIdReservation,
  data,
}) => {
  useTitle('Mes réservations');

  const handleModal = (e) => {
    const { id } = e.currentTarget.dataset;
    // action save id in state
    saveIdReservation(id);
    displayModal('reservation');
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
  }, []);
  console.log(data);
  return (
    <div className="wrapper reservations">
      {(showModal === 'modalReservation' || showModal === 'modalReservationImpossible') && (
        <Modal content={<ConfirmSupp />} />
      )}
      {showModal === 'reservation' && (
        <Modal content={<Details />} />
      )}
      <div className="reservations__breadcrumb">
        <Link to="/">Accueil ></Link>
        <Link to="/compte"> Mon compte ></Link>
        <Link to="/compte/reservations"> Mes reservations</Link>
      </div>
      <h1 className="reservations__title">Mes réservations</h1>
      <ul>
        {data.map((reservation) => (
          <li className="reservations__container" key={reservation.id}>
            <div className="reservations__container__item">
              <div className="reservations__container__item__left">
                <img className="reservations__container__item__left__picture" src="https://cdn3.trictrac.net/documents/formats/thumb_300_300/documents/originals/29/2c/676d3ba08cf231daf0fc67c709bc0ba8a6468f2fb878061c99c16e6f751d.jpeg" alt="" />
                <div>
                  <div className="reservations__container__item__left__text">
                    <h2 className="reservations__container__item__left__text__subtitle">{reservation.offer.title}
                    </h2>
                    {reservation.status === '0' && (
                      <span
                        className="reservations__container__item__left__text__status reservations__container__item__left__text__status--pending"
                      >En attente de validation
                      </span>
                    )}
                    {reservation.status === '1' && (
                      <span className="reservations__container__item__left__text__status reservations__container__item__left__text__status--available">Validée</span>
                    )}
                    {reservation.status === '2' && (
                      <span className="reservations__container__item__left__text__status reservations__container__item__left__text__status--available">En cours</span>
                    )}
                    {reservation.status === '3' && (
                      <span className="reservations__container__item__left__text__status reservations__container__item__left__text__status--finished">Terminée</span>
                    )}
                    {reservation.status === '4' && (
                      <span className="reservations__container__item__left__text__status reservations__container__item__left__text__status--canceled">Annulée</span>
                    )}
                  </div>
                  <h3 className="reservations__container__item__left__text__third">{reservation.offer.game.name}</h3>
                </div>
              </div>
              <div className="reservations__container__item__right">
                <button className="reservations__container__item__right__button global-button global-button--light" type="button" onClick={handleModal} data-id={reservation.id}> <i className="far fa-eye" /> Voir plus</button>
                <button
                  className="reservations__container__item__right__button global-button global-button--light"
                  type="button"
                  data-id={reservation.id}
                  data-status={reservation.status}
                  onClick={handleModalSupp}
                > <i className="fas fa-times" /> Annuler
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

Reservations.propTypes = {
  showModal: PropTypes.string.isRequired,
  displayModal: PropTypes.func.isRequired,
  fetchReservations: PropTypes.func.isRequired,
  saveIdReservation: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
export default Reservations;
