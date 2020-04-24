import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTitle } from 'src/hooks/useTitle';
import { truncateText, formatDate, slugifyId } from 'src/utils/selectors';
import PropTypes from 'prop-types';
import Modal from 'src/frontend/containers/Modal';
import ConfirmSupp from 'src/frontend/containers/Account/Modal';
import ModalRequest from 'src/frontend/containers/Account/Offers/ModalRequest';
import Loader from 'src/frontend/components/Loader';
// import classNames from 'classnames';
import './offers.scss';

const AccountOffers = ({
  data,
  fetchOffers,
  saveOfferId,
  displayModal,
  showModal,
  saveIdReservation,
  offerIsLoad,
  changeOfferIsLoad,
}) => {
  useTitle('Mes offres');
  useEffect(() => {
    console.log('passage par useEffect');
    async function load() {
      await fetchOffers();
      changeOfferIsLoad();
    }
    load();
    return () => {
      console.log('on passe en false');
      changeOfferIsLoad();
    };
  }, []);
  // return function cleanup() {
  //   setRequestIsLoad();
  // };
  const handleModal = (e) => {
    const { id } = e.currentTarget.dataset;
    saveOfferId(id);
    displayModal('modalOffer');
  };
  const handleModalImpossible = () => {
    displayModal('modalOfferImpossible');
  };

  const handleModalRequest = (e) => {
    const { id } = e.currentTarget.dataset;
    saveOfferId(id);
    displayModal('modalRequest');
  };

  const handleInProgress = (e) => {
    const { id, idreservation } = e.currentTarget.dataset;
    saveOfferId(id);
    saveIdReservation(idreservation);
    displayModal('modalInProgressReservation');
  };

  return (
    <div className="wrapper accountOffers">
      {!offerIsLoad && <Loader />}
      {offerIsLoad && (
        <>
          {(showModal === 'modalOffer' || showModal === 'modalOfferImpossible') && (
          <Modal content={<ConfirmSupp />} />
          )}
          {(showModal === 'modalRequest' || showModal === 'modalInProgressReservation') && (
          <Modal content={<ModalRequest />} />
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
                    <h2 className="accountOffers__listOffers__offer__left__content__subtitle">
                      {offer.status !== '1' && (
                        <>
                          {truncateText(offer.title)}
                          <span className="accountOffers__listOffers__offer__left__content__subtitle__euro"> ({offer.price} €)
                          </span>
                        </>
                      )}
                      {offer.status === '1' && (
                        <Link to={`/recherche/jeux/${offer.id}/${slugifyId(offer.title)}`}>
                          {truncateText(offer.title)}
                          <span className="accountOffers__listOffers__offer__left__content__subtitle__euro"> ({offer.price} €)
                          </span>
                        </Link>
                      )}
                    </h2>
                    <h3 className="">Nom du jeu : {offer.game.name}</h3>

                    {!offer.is_available && (
                      <>
                        <h3>Client : {offer.reservations[0].user.username}</h3>
                        <h3>Reservé le : {formatDate(offer.createdAt)}</h3>
                      </>
                    )}
                  </div>
                  <div className="accountOffers__listOffers__offer__middle">
                    <div
                      className={offer.is_available ? 'accountOffers__listOffers__offer__left__status' : 'accountOffers__listOffers__offer__left__status accountOffers__listOffers__offer__left__status--off'}
                    >{offer.is_available ? 'disponible' : 'réservée'}
                    </div>
                    <div className="accountOffers__listOffers__offer__middle__gathered">
                      {offer.is_available === false && (
                      <button
                        type="button"
                        title="Réservation en cours"
                        className="accountOffers__listOffers__offer__middle__request__inProgress"
                        data-id={offer.id}
                        data-idreservation={offer.reservations[0].id}
                        onClick={handleInProgress}
                      >
                        <i className="fas fa-dragon" />
                      </button>
                      )}
                      {offer.reservations.length !== 0 && offer.status === '1' && offer.is_available === true && (
                        <>
                          <button
                            className="accountOffers__listOffers__offer__middle__request"
                            type="button"
                            onClick={handleModalRequest}
                            data-id={offer.id}
                          >
                            <i className="fas fa-concierge-bell" />
                          </button>
                          <span>{offer.reservations.length}</span>
                        </>
                      )}
                      {offer.status === '0' && (
                      <i className="accountOffers__listOffers__offer__left__content__bottom__pending fas fa-exclamation-circle" title="Votre offre est en attente de validation" />
                      )}
                      {offer.status === '1' && (
                      <i className="fas fa-check-circle accountOffers__listOffers__offer__left__content__bottom__available" title="votre offre à été validée" />
                      )}
                      {offer.status === '2' && (
                      <i className="fas fa-minus-circle accountOffers__listOffers__offer__left__content__bottom__delete" title="Votre offre à été refusée" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="accountOffers__listOffers__offer__right">
                  {(offer.status === '1' && offer.is_available === true) && (
                    <Link to={`/compte/offres/${offer.id}`} className="global-button global-button--light"><i className="fas fa-pencil-alt accountOffers__listOffers__offer__right__pencil accountOffers__buttonUpdate" /> Modifier</Link>
                  )}
                  {(offer.status === '0' || offer.status === '2' || (offer.status === '1' && offer.is_available === false)) && (
                    <button
                      type="button"
                      disabled
                      className="button__disabled"
                    >
                      <i className="fas fa-pencil-alt button__disabled__pencil" />Modifier
                    </button>
                  )}
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
        </>
      )}
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
  displayModal: PropTypes.func.isRequired,
  showModal: PropTypes.string.isRequired,
  saveOfferId: PropTypes.func.isRequired,
  saveIdReservation: PropTypes.func.isRequired,
  offerIsLoad: PropTypes.bool.isRequired,
  changeOfferIsLoad: PropTypes.func.isRequired,
};

export default AccountOffers;
