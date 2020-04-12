import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './details.scss';
import Alert from 'src/frontend/containers/Alert';
import Modal from 'src/frontend/containers/Modal';
import BookGame from 'src/frontend/containers/Offer/Details/BookGame';

const Details = ({
  showAlert,
  displayAlert,
  showModal,
  displayModal,
}) => {
  const handleFavorite = () => {
    displayAlert('Vous avez bien rajouté cette offre dans vos favoris', true);
  };

  const handleModal = () => {
    displayModal('bookGame');
  };

  return (
    <article className="wrapper offer-detail">
      {showAlert && <Alert />}
      {showModal === 'bookGame' && <Modal content={<BookGame />} />}
      <div className="offer-detail__breadcrumb">
        <Link to="/">Accueil ></Link>
        <Link to="/recherche/jeux">Ma recherche ></Link>
        <Link to="/offre/:id-:offerName">Offre</Link>
      </div>
      <div className="offer-detail__infos">
        <h1 className="offer-detail__infos__title">Titre de l'offre</h1>
        <div className="offer-detail__infos__disponibility">Disponible</div>
      </div>
      <div className="offer-detail__stats">
        <div className="offer-detail__stats__item"><i className="fas fa-funnel-dollar" /> <span className="offer-detail__stats__item__value">Prêt / Location</span> <div className="offer-detail__stats__item__label">Type</div></div>
        <div className="offer-detail__stats__item"><i className="fas fa-coins" /> <span className="offer-detail__stats__item__value">5€ / gratuit</span> <div className="offer-detail__stats__item__label">Prix</div></div>
        <div className="offer-detail__stats__item"><i className="fas fa-tags" /> <span className="offer-detail__stats__item__value">Jeu de carte</span> <div className="offer-detail__stats__item__label">Categorie</div></div>
        <div className="offer-detail__stats__item"><i className="fas fa-users" /> <span className="offer-detail__stats__item__value">3-10</span> <div className="offer-detail__stats__item__label">Nombre de joueurs</div></div>
        <div className="offer-detail__stats__item"><i className="fas fa-child" /> <span className="offer-detail__stats__item__value">3 ans</span> <div className="offer-detail__stats__item__label">Age minimum</div></div>
        <div className="offer-detail__stats__item"><i className="fas fa-stopwatch" /> <span className="offer-detail__stats__item__value">30 - 60 minutes</span> <div className="offer-detail__stats__item__label">Durée d'une partie</div></div>
      </div>
      <div className="offer-detail__global">
        <div className="offer-detail__left">
          <div className="offer-detail__left__description">
            <h1 className="offer-detail__left__description__title">Description</h1>
            <p className="offer-detail__left__description__content">
              Lorem ipsum dolor
              Etiam dapibus libero in mi commodo, at mattis nisi hendrerit.
              Donec ligula eros, dapibus ac sapien vitae, mattis sollicitudin
              nibh. Vestibulum accumsan eu urna vel fermentum. Ut egestas justo
              tellus, et condimentum nisl sodales et. Praesent vel maximus
              odio. Ut faucibus, urna sit amet pharetra imperdiet, orci est
              cursus tortor, et viverra risus arcu a nunc. Maecenas ipsum arcu,
              pulvinar eu aliquet in, maximus eu est. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia Curae;
              Nullam pretium luctus metus, a commodo felis fermentum et.
              Vestibulum malesuada leo at scelerisque venenatis. Pellentesque
              dapibus faucibus pellentesque. Vestibulum pulvinar venenatis
              ipsum ac tempus. Etiam sed egestas lacus, a viverra leo.
            </p><br />
            <p className="offer-detail__left__description__content">
              Lorem ipsum dolor
              Etiam dapibus libero in mi commodo, at mattis nisi hendrerit.
              Donec ligula eros, dapibus ac sapien vitae, mattis sollicitudin
              nibh. Vestibulum accumsan eu urna vel fermentum. Ut egestas justo
              tellus, et condimentum nisl sodales et. Praesent vel maximus
              odio. Ut faucibus, urna sit amet pharetra imperdiet, orci est
              cursus tortor, et viverra risus arcu a nunc. Maecenas ipsum arcu,
              pulvinar eu aliquet in, maximus eu est. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia Curae;
              Nullam pretium luctus metus, a commodo felis fermentum et.
              Vestibulum malesuada leo at scelerisque venenatis. Pellentesque
              dapibus faucibus pellentesque. Vestibulum pulvinar venenatis
              ipsum ac tempus. Etiam sed egestas lacus, a viverra leo.
            </p><br />

            <p className="offer-detail__left__description__content">
              Lorem ipsum dolor
              Etiam dapibus libero in mi commodo, at mattis nisi hendrerit.
              Donec ligula eros, dapibus ac sapien vitae, mattis sollicitudin
              nibh. Vestibulum accumsan eu urna vel fermentum. Ut egestas justo
              tellus, et condimentum nisl sodales et. Praesent vel maximus
              odio. Ut faucibus, urna sit amet pharetra imperdiet, orci est
              cursus tortor, et viverra risus arcu a nunc. Maecenas ipsum arcu,
              pulvinar eu aliquet in, maximus eu est. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia Curae;
              Nullam pretium luctus metus, a commodo felis fermentum et.
              Vestibulum malesuada leo at scelerisque venenatis. Pellentesque
              dapibus faucibus pellentesque. Vestibulum pulvinar venenatis
              ipsum ac tempus. Etiam sed egestas lacus, a viverra leo.
            </p><br />
            <p className="offer-detail__left__description__content">
              Lorem ipsum dolor
              Etiam dapibus libero in mi commodo, at mattis nisi hendrerit.
              Donec ligula eros, dapibus ac sapien vitae, mattis sollicitudin
              nibh. Vestibulum accumsan eu urna vel fermentum. Ut egestas justo
              tellus, et condimentum nisl sodales et. Praesent vel maximus
              odio. Ut faucibus, urna sit amet pharetra imperdiet, orci est
              cursus tortor, et viverra risus arcu a nunc. Maecenas ipsum arcu,
              pulvinar eu aliquet in, maximus eu est. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia Curae;
              Nullam pretium luctus metus, a commodo felis fermentum et.
              Vestibulum malesuada leo at scelerisque venenatis. Pellentesque
              dapibus faucibus pellentesque. Vestibulum pulvinar venenatis
              ipsum ac tempus. Etiam sed egestas lacus, a viverra leo.
            </p><br />
          </div>
          <div className="offer-detail__left__buttons">
            <button className="offer-detail__left__buttons__button global-button" type="button" onClick={handleFavorite}> <i className="fas fa-star" /></button>
            <button
              type="button"
              className="offer-detail__left__buttons__button global-button"
              onClick={handleModal}
            >Réserver ce jeu
            </button>
          </div>
          <section className="offer-detail__left__user">
            <p className="offer-detail__left__user__content">A propos de Mme Michu :</p>
            <p className="offer-detail__left__user__content">Inscrit depuis ...</p>
            <p className="offer-detail__left__user__content">Possède 10 jeux ...</p>
          </section>
        </div>
        <div className="offer-detail__right">
          <img className="offer-detail__right__image" src="https://cdn3.trictrac.net/documents/formats/thumb_300_300/documents/originals/29/2c/676d3ba08cf231daf0fc67c709bc0ba8a6468f2fb878061c99c16e6f751d.jpeg" alt="" />
          <div className="offer-detail__right__map">
            map
          </div>
        </div>
      </div>
    </article>
  );
};

Details.propTypes = {
  showAlert: PropTypes.bool.isRequired,
  displayAlert: PropTypes.func.isRequired,
  displayModal: PropTypes.func.isRequired,
  showModal: PropTypes.string.isRequired,
};

export default Details;
