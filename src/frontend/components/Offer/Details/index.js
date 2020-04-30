import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTitle } from 'src/hooks/useTitle';
import { formatDate } from 'src/utils/selectors';

import noimage from 'src/assets/images/noimage_450.jpg';
import './details.scss';
import Alert from 'src/frontend/containers/Alert';
import Modal from 'src/frontend/containers/Modal';
import BookGame from 'src/frontend/containers/Offer/Details/BookGame';
import Loader from 'src/frontend/components/Loader';
import Map from 'src/frontend/containers/Map';

const Details = ({
  showAlert,
  displayAlert,
  showModal,
  displayModal,
  saveOfferId,
  getOffer,
  offerDetailIsLoad,
  changeOfferDetailIsLoad,
  offer,
  isLogged,
  clearOffer,
  addFavorite,
  removeFavorite,
  checkOfferInFavorite,
  checkOfferInReservation,
  setOfferInFavorite,
  setOfferInReservation,
  offerInFavorite,
  offerInReservation,
  saveCurrentFavorite,
  userId,
}) => {
  const { id } = useParams();

  useEffect(() => {
    saveOfferId(id);
    getOffer();

    return function cleanup() {
      changeOfferDetailIsLoad();
      clearOffer();
      setOfferInFavorite(false);
      setOfferInReservation(false);
      saveCurrentFavorite(0);
    };
  }, []);

  useEffect(() => {
    if (offer.id !== 0 && isLogged) {
      checkOfferInFavorite();
      checkOfferInReservation();
    }
    if (offer.id !== 0) {
      changeOfferDetailIsLoad();
    }
  }, [offer]);

  useTitle(offer.title);

  const handleFavorite = () => {
    if (isLogged) {
      if (offerInFavorite) {
        displayAlert('Vous avez bien retiré cette offre de vos favoris', true);
        removeFavorite();
      }
      else {
        displayAlert('Vous avez bien ajouté cette offre dans vos favoris', true);
        addFavorite();
      }
    }
    else {
      displayModal('login');
    }
  };

  const handleModal = () => {
    if (isLogged) {
      if (offerInReservation) {
        displayAlert('Vous avez déjà effectué une demande de reservation pour cette offre', false);
      }
      else {
        displayModal('bookGame');
      }
    }
    else {
      displayModal('login');
    }
  };

  const disponibilityClass = classNames('offer-detail__infos__disponibility', { 'offer-detail__infos__disponibility--off': !offer.is_available });
  const favoriteClass = classNames('offer-detail__left__buttons__button global-button', { active: offerInFavorite });

  const isOwner = (offer.userId === userId);

  return (
    <>
      {!offerDetailIsLoad && <Loader />}
      {offerDetailIsLoad && (
        <article className="wrapper offer-detail">
          {showAlert && <Alert />}
          {showModal === 'bookGame' && <Modal content={<BookGame offer={offer} />} />}
          <div className="offer-detail__breadcrumb">
            <Link to="/">Accueil ></Link>
            <Link to="/recherche/jeux">Ma recherche ></Link>
            <Link to="/offre/:id-:offerName">Offre</Link>
          </div>
          <div className="offer-detail__infos">
            <h1 className="offer-detail__infos__title">{offer.title}</h1>
            <div className={disponibilityClass}>{offer.is_available ? 'Disponible' : 'Non disponible'}</div>
          </div>
          <p className="offer-detail__game">{offer.game.name}</p>
          <div className="offer-detail__stats">
            <div className="offer-detail__stats__item"><i className="fas fa-funnel-dollar" /> <span className="offer-detail__stats__item__value">{offer.type === '0' ? 'Prêt' : 'Location'}</span> <div className="offer-detail__stats__item__label">Type</div></div>
            <div className="offer-detail__stats__item"><i className="fas fa-coins" /> <span className="offer-detail__stats__item__value">{offer.price === 0 ? 'Gratuit' : `${offer.price}€`}</span> <div className="offer-detail__stats__item__label">Prix</div></div>
            <div className="offer-detail__stats__item"><i className="fas fa-tags" /> <span className="offer-detail__stats__item__value">{offer.game.game_category.name}</span> <div className="offer-detail__stats__item__label">Categorie</div></div>
            <div className="offer-detail__stats__item"><i className="fas fa-users" /> <span className="offer-detail__stats__item__value">{`${offer.game.nb_players_min}-${offer.game.nb_players_max}`}</span> <div className="offer-detail__stats__item__label">Nombre de joueurs</div></div>
            <div className="offer-detail__stats__item"><i className="fas fa-child" /> <span className="offer-detail__stats__item__value">{offer.game.age_min} ans</span> <div className="offer-detail__stats__item__label">Age minimum</div></div>
            <div className="offer-detail__stats__item"><i className="fas fa-stopwatch" /> <span className="offer-detail__stats__item__value">{offer.game.duration !== null ? offer.game.duration : '-'}</span> <div className="offer-detail__stats__item__label">Durée d'une partie</div></div>
          </div>
          <div className="offer-detail__global">
            <div className="offer-detail__left">
              <div className="offer-detail__left__description">
                <h1 className="offer-detail__left__description__title">Description</h1>
                {offer.description}
              </div>
              <div className="offer-detail__left__buttons">
                <button
                  className={favoriteClass}
                  type="button"
                  onClick={handleFavorite}
                >
                  <i className="fas fa-star" />
                </button>
                <button type="button" className="offer-detail__left__buttons__button global-button" onClick={handleModal}>Réserver ce jeu</button>
              </div>
              <section className="offer-detail__left__user">
                <div>
                  {(offer.user.picture === '' || offer.user.picture === null) ? <div className="default-user-image"><i className="fas fa-user" /></div> : <img className="user-picture" src={`http://ec2-54-167-103-17.compute-1.amazonaws.com/images/users/${offer.user.picture}`} alt="" />}
                </div>
                <div className="offer-detail__left__user__container">
                  <p className="offer-detail__left__user__content"><span>Créer par : </span> {offer.user.display_name ? `${offer.user.firstname} ${offer.user.lastname}` : offer.user.username}
                  </p>
                  <p className="offer-detail__left__user__content">
                    <span>Mise en ligne le : </span> {formatDate(offer.createdAt)}
                  </p>
                  <p className="offer-detail__left__user__content">
                    <span>Membre depuis le : </span> {formatDate(offer.user.createdAt)}
                  </p>
                </div>
              </section>
            </div>
            <div className="offer-detail__right">
              <img className="offer-detail__right__image" src={(offer.image !== null && offer.image !== '') ? `http://ec2-54-167-103-17.compute-1.amazonaws.com/images/offers/${offer.image}` : noimage} alt="" />
              <div className="offer-detail__right__map">
                <div className="offer-detail__right__map__text"><p>{offer.postal_code} {offer.city}</p></div>
                <Map lat={offer.latitude} lng={offer.longitude} />
              </div>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

Details.propTypes = {
  showAlert: PropTypes.bool.isRequired,
  displayAlert: PropTypes.func.isRequired,
  displayModal: PropTypes.func.isRequired,
  showModal: PropTypes.string.isRequired,
  saveOfferId: PropTypes.func.isRequired,
  getOffer: PropTypes.func.isRequired,
  offerDetailIsLoad: PropTypes.bool.isRequired,
  changeOfferDetailIsLoad: PropTypes.func.isRequired,
  offer: PropTypes.object.isRequired,
  isLogged: PropTypes.bool.isRequired,
  clearOffer: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  checkOfferInFavorite: PropTypes.func.isRequired,
  checkOfferInReservation: PropTypes.func.isRequired,
  setOfferInFavorite: PropTypes.func.isRequired,
  setOfferInReservation: PropTypes.func.isRequired,
  offerInFavorite: PropTypes.bool.isRequired,
  offerInReservation: PropTypes.bool.isRequired,
  saveCurrentFavorite: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default Details;
