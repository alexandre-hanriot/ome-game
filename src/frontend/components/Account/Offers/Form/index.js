/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { formatDate } from 'src/utils/selectors';
import MapAutocomplete from 'react-google-autocomplete';

import Loader from 'src/frontend/components/Loader';
import Map from 'src/frontend/containers/Map';

import './form.scss';

const Form = ({
  offer, saveOfferId,
  getOffer, clearOffer, handleFormInput,
  categories, games, addGame, getGameCategories, getGames, changeCategoriesIsLoad,
  changeGameIsLoad, gamesIsLoad, categoriesIsLoad, handleAddOffer,
  handleModifyOffer, changeOfferIsLoad, setNewGameField, newGameField, handleFormInputGame, game, displayAlert,
}) => {
  const { slug } = useParams();
  useEffect(() => {
    if (typeof slug !== 'undefined') {
      saveOfferId(slug);
      getOffer();
    }
    getGameCategories();
    getGames();
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
      }
      else if (id === offer.game.id) {
        handleFormInputGame('gameCategoryId', offer.game.gameCategoryId);
        handleFormInputGame('nb_players_min', offer.game.nb_players_min);
        handleFormInputGame('nb_players_max', offer.game.nb_players_max);
        handleFormInputGame('age_min', offer.game.age_min);
        handleFormInputGame('duration', offer.game.duration);
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

    if (!error && offer.gameId === 0) {
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

  return (
    <>
      {(!gamesIsLoad || !categoriesIsLoad) && <Loader />}
      {(gamesIsLoad && categoriesIsLoad) && (
        <div className="wrapper account-offers-form">

          <div className="account-offers-form__breadcrumb">
            <Link to="/">Accueil</Link> > <Link to="/compte">Mon compte</Link> > <Link to="/compte/offres">Mes offres</Link> > { offer.id === 0 ? 'Ajouter' : 'Modifier' }
          </div>

          <h1 className="account-offers-form__title">{ offer.id === 0 ? 'Ajouter' : 'Modifier' } une offre</h1>
          <form onSubmit={handleSubmit}>
            <div className="account-offers-form__container">
              <div className="account-offers-form__container__left">
                <input
                  type="text"
                  name="title"
                  placeholder="Nom de l'offre"
                  className="account-offers-form__name global-input"
                  value={offer.title}
                  onChange={changeInput}
                />
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
                  <input
                    type="text"
                    name="name"
                    placeholder="Nom du jeu"
                    className="global-input account-offers-form__game__type__value"
                    value={game.name}
                    onChange={changeInputGame}
                    disabled={!newGameField}
                  />
                </div>

                <div className="account-offers-form__game">
                  <select className="global-select" name="gameCategoryId" onChange={changeInputGame} disabled={!newGameField} value={game.gameCategoryId}>
                    <option value={0}>- Sélectionner une catégorie -</option>
                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                      >{category.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Nb de joueurs minimum"
                    className="global-input"
                    value={game.nb_players_min}
                    onChange={changeInputGame}
                    name="nb_players_min"
                    disabled={!newGameField}
                  />
                  <input
                    type="text"
                    placeholder="Nb de joueurs maximum"
                    className="global-input"
                    value={game.nb_players_max}
                    onChange={changeInputGame}
                    name="nb_players_max"
                    disabled={!newGameField}
                  />
                </div>
                <div className="account-offers-form__game">
                  <input
                    type="text"
                    placeholder="Durée d'une partie"
                    className="global-input"
                    value={game.duration}
                    onChange={changeInputGame}
                    name="duration"
                    disabled={!newGameField}
                  />
                  <input
                    type="text"
                    placeholder="Age minimum"
                    className="global-input"
                    value={game.age_min}
                    onChange={changeInputGame}
                    name="age_min"
                    disabled={!newGameField}
                  />
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
                <button type="submit" className="account-offers-form__submit">{ offer.id === 0 ? 'Ajouter' : 'Modifier' }</button>
              </div>
              <div className="account-offers-form__container__right">

                <div className="account-offers-form__block account-offers-form__block--flex50">
                  <div className="account-offers-form__status">
                    <h2 className="account-offers-form__subtitle">Etat</h2>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="status"
                          checked={offer.status === '0'}
                          onChange={changeInput}
                          value="0"
                        /> Actif
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="status"
                          checked={offer.status === '1'}
                          onChange={changeInput}
                          value="1"
                        /> Inactif
                      </label>
                    </div>
                  </div>
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
                  <button type="button" className="account-offers-form__game__image__define">Définir une image</button>
                </div>

                <div className="account-offers-form__block">
                  <h2 className="account-offers-form__subtitle">Localisation</h2>
                  <MapAutocomplete
                    className="account-offers-form__location global-input"
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

                      if (length === 5) {
                        handleFormInput('city', place.address_components[1].long_name);
                        handleFormInput('postal_code', place.address_components[0].long_name);
                      }

                      const lat = place.geometry.location.lat();
                      const lng = place.geometry.location.lng();

                      handleFormInput('latitude', lat.toString());
                      handleFormInput('longitude', lng.toString());
                      handleFormInput('zoom', zoom);
                    }}
                    types={['(regions)']}
                    componentRestrictions={{ country: 'fr' }}
                    defaultValue={(offer.postal_code !== null && offer.city !== null) ? `${offer.postal_code} ${offer.city}` : ''}
                  />
                  <div className="account-offers-form__map">
                    <Map zoom={offer.zoom} lat={offer.latitude} lng={offer.longitude} />
                  </div>
                </div>
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
};

export default Form;
