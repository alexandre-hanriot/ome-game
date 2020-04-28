/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { formatDate, labelClassname } from 'src/utils/selectors';
import MapAutocomplete from 'react-google-autocomplete';
import Modal from 'src/frontend/containers/Modal';
import Loader from 'src/frontend/components/Loader';
import Map from 'src/frontend/containers/Map';
import Upload from 'src/frontend/containers/Account/Offers/Form/Upload';

import './form.scss';

const Form = ({
  offer, saveOfferId,
  getOffer, clearOffer, handleFormInput,
  categories, games, addGame, getGameCategories, getGames, changeCategoriesIsLoad,
  changeGameIsLoad, gamesIsLoad, categoriesIsLoad, handleAddOffer,
  handleModifyOffer, changeOfferIsLoad, setNewGameField, newGameField, handleFormInputGame, game, displayAlert, offerSend, setOfferSend,
  showModal, displayModal,
}) => {
  const { slug } = useParams();
  useEffect(() => {
    if (typeof slug !== 'undefined') {
      saveOfferId(slug);
      getOffer();
    }
    getGameCategories();
    getGames({
      status: '1',
    });
    return () => {
      clearOffer();
      changeCategoriesIsLoad();
      changeGameIsLoad();
      changeOfferIsLoad();
    };
  }, []);

  useEffect(() => {
    const id = offer.gameId;
    if (id > 0 && !newGameField) {
      if (gamesIsLoad) {
        const currentGame = games.find((g) => g.id === id);
        handleFormInputGame('gameCategoryId', currentGame.gameCategoryId);
        handleFormInputGame('nb_players_min', currentGame.nb_players_min);
        handleFormInputGame('nb_players_max', currentGame.nb_players_max);
        handleFormInputGame('age_min', currentGame.age_min);
        handleFormInputGame('duration', currentGame.duration);
        if (offer.game.image === '' || offer.game.image === null) {
          handleFormInput('image', currentGame.image);
        }
        if (offer.description !== null && offer.description.length === 0) {
          handleFormInput('description', currentGame.description);
        }
      }
      else if (id === offer.game.id) {
        handleFormInputGame('gameCategoryId', offer.game.gameCategoryId);
        handleFormInputGame('nb_players_min', offer.game.nb_players_min);
        handleFormInputGame('nb_players_max', offer.game.nb_players_max);
        handleFormInputGame('age_min', offer.game.age_min);
        handleFormInputGame('duration', offer.game.duration);
        if (offer.game.image !== '' && offer.game.image !== null) {
          handleFormInput('image', offer.game.image);
        }
      }
    }
    else {
      handleFormInputGame('gameCategoryId', 0);
      handleFormInputGame('nb_players_min', '');
      handleFormInputGame('nb_players_max', '');
      handleFormInputGame('age_min', '');
      handleFormInputGame('duration', '');
      handleFormInputGame('name', '');
    }
  }, [offer.gameId]);

  const changeInput = (event) => {
    const identifier = event.target.name;
    let newValue = event.target.value;

    if (identifier === 'is_available') {
      newValue = Boolean(Number(newValue));
    }
    if (['game_gameCategoryId', 'gameId'].includes(identifier)) {
      newValue = Number(newValue);
    }
    handleFormInput(identifier, newValue);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    setOfferSend(true);

    let error = false;
    let errorMessage = '';

    if (offer.title === '') {
      error = true;
      errorMessage = 'Vous devez renseigner le nom de l\'offre';
    }

    if (!error && (offer.latitude === null || offer.longitude === null)) {
      error = true;
      errorMessage = 'Vous devez renseigner une localisation';
    }

    if (!error && newGameField && (game.name === '' || game.nb_players_max === '' || game.nb_players_min === '' || game.age_min === '' || game.duration === '' || game.gameCategoryId === 0)) {
      error = true;
      errorMessage = 'il faut remplir tous les champs concernant le jeu';
    }

    if (!error && !newGameField && offer.gameId === 0) {
      error = true;
      errorMessage = 'Vous devez renseigner le jeu';
    }

    if (!error) {
      if (newGameField) {
        addGame();
      }
      else if (offer.id === 0) {
        handleAddOffer();
      }
      else {
        handleModifyOffer();
      }
    }
    else {
      displayAlert(errorMessage, false);
      setOfferSend(false);
    }
  };

  const handleChangeNewGame = (e) => {
    let { value } = e.target;
    value = Boolean(Number(value));
    setNewGameField(value);

    if (value) {
      handleFormInput('gameId', 0);
    }
  };

  const changeInputGame = (e) => {
    const { name, value } = e.target;
    handleFormInputGame(name, value);
  };

  const handleClickUpload = () => {
    displayModal('upload');
  };

  const handleClickRemoveImage = () => {
    handleFormInput('image', null);
  };

  let location = '';
  if (offer.postal_code !== null && offer.postal_code !== '') {
    location += `${offer.postal_code} `;
  }
  if (offer.city !== null && offer.city !== '') {
    location += offer.city;
  }

  return (
    <>
      {(!gamesIsLoad || !categoriesIsLoad) && <Loader />}
      {(gamesIsLoad && categoriesIsLoad) && (
        <div className="wrapper account-offers-form">
          {showModal === 'upload' && <Modal content={<Upload />} />}

          <div className="account-offers-form__breadcrumb">
            <Link to="/">Accueil</Link> > <Link to="/compte">Tableau de bord</Link> > <Link to="/compte/offres">Mes offres</Link> > { offer.id === 0 ? 'Ajouter' : 'Modifier' }
          </div>

          <h1 className="account-offers-form__title">{ offer.id === 0 ? 'Ajouter' : 'Modifier' } une offre</h1>
          <form onSubmit={handleSubmit}>
            <div className="account-offers-form__container">
              <div className="account-offers-form__container__global">
                <div className="account-offers-form__container__left">
                  <label className={`${labelClassname(offer.title)} account-offers-form__name`}>
                    <input
                      type="text"
                      name="title"
                      className="global-input"
                      value={offer.title}
                      onChange={changeInput}
                    />
                    <span>Nom de l'offre</span>
                  </label>
                  <h2 className="account-offers-form__subtitle">Jeu</h2>

                  <div className="account-offers-form__game__type">
                    <label className="account-offers-form__game__type__radio"><input type="radio" name="newGame" value="0" checked={!newGameField} onChange={handleChangeNewGame} />Jeu existant</label>
                    <select className="global-select account-offers-form__game__type__value" disabled={newGameField} onChange={changeInput} name="gameId" value={offer.gameId}>
                      <option value="0">- Sélectionner un jeu -</option>
                      {games.map((g) => (
                        <option
                          key={g.id}
                          value={g.id}
                        >{g.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="account-offers-form__game__type">
                    <label className="account-offers-form__game__type__radio"><input type="radio" name="newGame" value="1" checked={newGameField} onChange={handleChangeNewGame} />Nouveau jeu</label>
                    <label className={`${labelClassname(game.name)} account-offers-form__game__type__value`}>
                      <input
                        type="text"
                        name="name"
                        className="global-input"
                        value={game.name}
                        onChange={changeInputGame}
                        disabled={!newGameField}
                      />
                      <span>Nom du jeu</span>
                    </label>
                  </div>

                  <div className="account-offers-form__game">
                    <select className="global-select account-offers-form__game__category" name="gameCategoryId" onChange={changeInputGame} disabled={!newGameField} value={game.gameCategoryId}>
                      <option value={0}>- Sélectionner une catégorie -</option>
                      {categories.map((category) => (
                        <option
                          key={category.id}
                          value={category.id}
                        >{category.name}
                        </option>
                      ))}
                    </select>
                    <label className={`${labelClassname(game.nb_players_min)} account-offers-form__game__players-min`}>
                      <input
                        type="text"
                        className="global-input"
                        value={game.nb_players_min}
                        onChange={changeInputGame}
                        name="nb_players_min"
                        disabled={!newGameField}
                      />
                      <span>Nb de joueurs minimum</span>
                    </label>
                    <label className={`${labelClassname(game.nb_players_max)} account-offers-form__game__players-max`}>
                      <input
                        type="text"
                        className="global-input"
                        value={game.nb_players_max}
                        onChange={changeInputGame}
                        name="nb_players_max"
                        disabled={!newGameField}
                      />
                      <span>Nb de joueurs maximum</span>
                    </label>
                  </div>
                  <div className="account-offers-form__game">
                    <label className={`${labelClassname(game.duration)} account-offers-form__game__duration`}>
                      <input
                        type="text"
                        className="global-input"
                        value={game.duration}
                        onChange={changeInputGame}
                        name="duration"
                        disabled={!newGameField}
                      />
                      <span>Durée d'une partie</span>
                    </label>
                    <label className={`${labelClassname(game.age_min)} account-offers-form__game__age`}>
                      <input
                        type="text"
                        className="global-input"
                        value={game.age_min}
                        onChange={changeInputGame}
                        name="age_min"
                        disabled={!newGameField}
                      />
                      <span>Age minimum</span>
                    </label>
                  </div>

                  <h2 className="account-offers-form__subtitle">Description</h2>

                  <textarea
                    placeholder="Description"
                    className="account-offers-form__description global-input"
                    value={offer.description}
                    onChange={changeInput}
                    name="description"
                  />
                  {offer.createdAt !== '' && (<p className="account-offers-form__dates">Créée le {formatDate(offer.createdAt)}</p>)}
                  {offer.updatedAt !== '' && (<p className="account-offers-form__dates">Modifiée le {formatDate(offer.updatedAt)}</p>)}
                </div>
                <div className="account-offers-form__container__right">
                  <div className="account-offers-form__block account-offers-form__block--flex50">
                    <div className="account-offers-form__disponibility">
                      <h2 className="account-offers-form__subtitle">Disponibilité</h2>
                      <div>
                        <label>
                          <input
                            type="radio"
                            name="is_available"
                            checked={offer.is_available === true}
                            onChange={changeInput}
                            value="1"
                          /> Disponible
                        </label>
                      </div>
                      <div>
                        <label>
                          <input
                            type="radio"
                            name="is_available"
                            checked={offer.is_available === false}
                            onChange={changeInput}
                            value="0"
                          /> Non disponible
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="account-offers-form__block">
                    <h2 className="account-offers-form__subtitle">Type</h2>
                    <div className="account-offers-form__type">
                      <select className="global-select" name="type" onChange={changeInput} value={offer.type}>
                        <option
                          value="1"
                        >Location
                        </option>
                        <option
                          value="0"
                        >Prêt
                        </option>
                      </select>
                      <input
                        type="text"
                        placeholder="Prix (€)"
                        className="global-input"
                        value={offer.price}
                        onChange={changeInput}
                        name="price"
                        disabled={offer.type === '0'}
                      />
                    </div>
                  </div>

                  <div className="account-offers-form__block">
                    <h2 className="account-offers-form__subtitle">Image</h2>
                    {offer.image === null && <button type="button" className="account-offers-form__game__image__define" onClick={handleClickUpload}>Définir une image</button>}
                    {offer.image !== null && (
                    <div className="account-offers-form__game__image">
                      <img src={`http://ec2-54-167-103-17.compute-1.amazonaws.com/images/offers/${offer.image}`} alt="erreur" />
                      <button type="button" className="global-button global-button--light" onClick={handleClickUpload}>Modifier</button>
                      <button type="button" className="global-button global-button--light remove" onClick={handleClickRemoveImage}>Supprimer</button>
                    </div>
                    )}
                  </div>

                  <div className="account-offers-form__block">
                    <h2 className="account-offers-form__subtitle">Localisation</h2>
                    <MapAutocomplete
                      className="global-input account-offers-form__location"
                      onPlaceSelected={(place) => {
                      /*
                      number of element :
                        5 = ville
                        3 = departement
                        2 = region
                        1 = pays
                      */
                        let zoom = 12;
                        const { length } = place.address_components;
                        switch (length) {
                          case 3:
                            zoom = 9;
                            break;
                          case 2:
                            zoom = 8;
                            break;
                          case 1:
                            zoom = 5;
                            break;
                          default:
                            zoom = 12;
                        }

                        // if (length === 5) {
                        //   handleFormInput('city', place.address_components[1].long_name);
                        //   handleFormInput('postal_code', place.address_components[0].long_name);
                        // }

                        const hasLocality = place.address_components.filter((addr) => addr.types.includes('locality'));
                        const hasPostalCode = place.address_components.filter((addr) => addr.types.includes('postal_code'));
                        if (hasPostalCode.length > 0) {
                          handleFormInput('postal_code', hasPostalCode[0].long_name);
                        }
                        if (hasLocality.length > 0) {
                          handleFormInput('city', hasLocality[0].long_name);
                        }

                        const lat = place.geometry.location.lat();
                        const lng = place.geometry.location.lng();

                        handleFormInput('latitude', lat.toString());
                        handleFormInput('longitude', lng.toString());
                        handleFormInput('zoom', zoom);
                      }}
                      types={['(regions)']}
                      componentRestrictions={{ country: 'fr' }}
                      defaultValue={location}
                    />
                    <div className="account-offers-form__map">
                      <Map zoom={offer.zoom} lat={offer.latitude} lng={offer.longitude} />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {offerSend && <button type="submit" className="account-offers-form__submit" disabled><Loader withMargin={false} /></button>}
                {!offerSend && <button type="submit" className="account-offers-form__submit">{ offer.id === 0 ? 'Ajouter' : 'Modifier' }</button>}
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

Form.propTypes = {
  saveOfferId: PropTypes.func.isRequired,
  getOffer: PropTypes.func.isRequired,
  offer: PropTypes.object.isRequired,
  clearOffer: PropTypes.func.isRequired,
  handleFormInput: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  games: PropTypes.array.isRequired,
  addGame: PropTypes.func.isRequired,
  getGameCategories: PropTypes.func.isRequired,
  getGames: PropTypes.func.isRequired,
  changeGameIsLoad: PropTypes.func.isRequired,
  changeCategoriesIsLoad: PropTypes.func.isRequired,
  gamesIsLoad: PropTypes.bool.isRequired,
  categoriesIsLoad: PropTypes.bool.isRequired,
  handleModifyOffer: PropTypes.func.isRequired,
  handleAddOffer: PropTypes.func.isRequired,
  changeOfferIsLoad: PropTypes.func.isRequired,
  setNewGameField: PropTypes.func.isRequired,
  newGameField: PropTypes.bool.isRequired,
  game: PropTypes.object.isRequired,
  handleFormInputGame: PropTypes.func.isRequired,
  displayAlert: PropTypes.func.isRequired,
  offerSend: PropTypes.bool.isRequired,
  setOfferSend: PropTypes.func.isRequired,
  showModal: PropTypes.string.isRequired,
  displayModal: PropTypes.func.isRequired,
};

export default Form;
