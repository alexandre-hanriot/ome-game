import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTitle } from 'src/hooks/useTitle';
import PropTypes from 'prop-types';
import Modal from 'src/frontend/containers/Modal';
import ConfirmSupp from 'src/frontend/containers/Account/Modal';
import classNames from 'classnames';
import './offers.scss';

const AccountOffers = ({
  data,
  fetchOffers,
  getOfferId,
  displayModal,
  showModal,
}) => {
  useTitle('Mes offres');
  useEffect(() => {
    fetchOffers();
  }, []);

  const handleModal = (e) => {
    const { id } = e.currentTarget.dataset;
    getOfferId(id);
    displayModal('modalOffer');
    // deleteOffer();
  };
  const handleModalImpossible = () => {
    displayModal('modalOfferImpossible');
  };

  return (
    <div className="wrapper accountOffers">
      {(showModal === 'modalOffer' || showModal === 'modalOfferImpossible') && (
        <Modal content={<ConfirmSupp />} />
      )}
      <div className="reservations__breadcrumb">
        <Link to="/">Accueil ></Link>
        <Link to="/compte"> Mon compte > </Link>
        Offres
      </div>
      <div className="accountOffers__global">
        <h1 className="accountOffers__global__title">Mes Offres</h1>
        <Link
          className="global-button accountOffers__global__createOffer"
          to="/compte/offres/ajouter"
        >
          Créer une offre
        </Link>
      </div>
      <ul className="accountOffers__listOffers">
        {data.map((offer) => (
          <li className="accountOffers__listOffers__offer" key={offer.id}>
            <div className="accountOffers__listOffers__offer__left">
              <img className="accountOffers__listOffers__offer__left__picture" src="https://cdn3.trictrac.net/documents/formats/thumb_300_300/documents/originals/29/2c/676d3ba08cf231daf0fc67c709bc0ba8a6468f2fb878061c99c16e6f751d.jpeg" alt="" />
              <div className="accountOffers__listOffers__offer__left__content">
                <h2 className="accountOffers__listOffers__offer__left__content__subtitle">{offer.title}<span className="accountOffers__listOffers__offer__left__content__subtitle__euro"> ({offer.price} €)</span></h2>
                <h3 className="">Nom du jeu : {offer.game.name}</h3>
                <h3>Client : {offer.userId}</h3>
                <h3>Date : {offer.createdAt}</h3>
              </div>
              <div
                className={offer.is_available ? 'accountOffers__listOffers__offer__left__status' : 'accountOffers__listOffers__offer__left__status accountOffers__listOffers__offer__left__status--off'}
              >{offer.is_available ? 'disponible' : 'réservée'}
              </div>
            </div>
            <div className="accountOffers__listOffers__offer__right">
              <Link to={`/compte/offre/${offer.id}`} className="global-button global-button--light"><i className="fas fa-pencil-alt accountOffers__listOffers__offer__right__pencil" /> Modifier</Link>
              <button
                type="button"
                data-id={offer.id}
                className="global-button global-button--light accountOffers__buttonRemove"
                onClick={offer.is_available ? handleModal : handleModalImpossible}
              ><i className="fas fa-trash-alt accountOffers__listOffers__offer__right__trash" /> Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

AccountOffers.propTypes = {
  fetchOffers: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  getOfferId: PropTypes.func.isRequired,
  displayModal: PropTypes.func.isRequired,
  showModal: PropTypes.string.isRequired,
};

export default AccountOffers;
