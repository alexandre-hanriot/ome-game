/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import Loader from 'src/frontend/components/Loader';

import './form.scss';

const Form = ({
  offer, getOfferId,
  getOffer, clearOffer, handleFormInput,
  categories, getGameCategories, getGames, changeCategoriesIsLoad,
  changeGameIsLoad, gamesIsLoad, categoriesIsLoad,
}) => {
  const { slug } = useParams();
  useEffect(() => {
    getOfferId(slug);
    getOffer();
    getGameCategories();
    getGames();
    return () => {
      clearOffer();
      changeCategoriesIsLoad();
      changeGameIsLoad();
    };
  }, []);
  const changeInput = (event) => {
    const identifier = event.target.name;
    let newValue = event.target.value;
    // convert
    if (identifier === 'is_available') {
      newValue = Boolean(Number(newValue));
    }
    if (identifier === 'game_gameCategoryId') {
      newValue = Number(newValue);
    }
    handleFormInput(identifier, newValue);
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
          <form>
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

                <input
                  type="text"
                  name="game_name"
                  placeholder="Nom du jeu"
                  className="account-offers-form__game__name global-input"
                  value={offer.game.name}
                  onChange={changeInput}
                />
                <div className="account-offers-form__game">
                  <select className="global-select" name="game_gameCategoryId" onChange={changeInput}>
                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                        selected={category.id === offer.game.gameCategoryId}
                      >{category.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Nb de joueurs minimum"
                    className="global-input"
                    value={offer.game.nb_players_min}
                    onChange={changeInput}
                    name="game_nb_players_min"
                  />
                  <input
                    type="text"
                    placeholder="Nb de joueurs maximum"
                    className="global-input"
                    value={offer.game.nb_players_max}
                    onChange={changeInput}
                    name="game_nb_players_max"
                  />
                </div>
                <div className="account-offers-form__game">
                  <input
                    type="text"
                    placeholder="Durée d'une partie"
                    className="global-input"
                    value={offer.game.duration === null ? 'non défini' : offer.game.duration}
                    onChange={changeInput}
                    name="game_duration"
                  />
                  <input
                    type="text"
                    placeholder="Age minimum"
                    className="global-input"
                    value={offer.game.age_min}
                    onChange={changeInput}
                    name="game_age_min"
                  />
                </div>

                <h2 className="account-offers-form__subtitle">Description</h2>

                <textarea
                  placeholder="Description"
                  className="account-offers-form__description global-input"
                  value={offer.game.description === '' ? 'non défini' : offer.game.description}
                  onChange={changeInput}
                  name="game_description"
                />
                <p className="account-offers-form__dates">Créée le {offer.createdAt}</p>
                <p className="account-offers-form__dates">Modifiée le {offer.updatedAt}</p>
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
                    <select className="global-select" name="type" onChange={changeInput}>
                      <option
                        value="1"
                        selected={offer.type === '1'}
                      >Location
                      </option>
                      <option
                        value="0"
                        selected={offer.type === '0'}
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
                    />
                  </div>
                </div>

                <div className="account-offers-form__block">
                  <h2 className="account-offers-form__subtitle">Image</h2>
                  <button type="button" className="account-offers-form__game__image__define">Définir une image</button>
                </div>

                <div className="account-offers-form__block">
                  <h2 className="account-offers-form__subtitle">Localisation</h2>
                  <input
                    type="text"
                    placeholder="Saisissez un lieu"
                    className="account-offers-form__location global-input"
                    value={offer.city}
                    onChange={changeInput}
                    name="city"
                  />
                  <div className="account-offers-form__map"> </div>
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
  getOfferId: PropTypes.func.isRequired,
  getOffer: PropTypes.func.isRequired,
  offer: PropTypes.object.isRequired,
  clearOffer: PropTypes.func.isRequired,
  handleFormInput: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  getGameCategories: PropTypes.func.isRequired,
  getGames: PropTypes.func.isRequired,
  changeGameIsLoad: PropTypes.func.isRequired,
  changeCategoriesIsLoad: PropTypes.func.isRequired,
  gamesIsLoad: PropTypes.bool.isRequired,
  categoriesIsLoad: PropTypes.bool.isRequired,
};

export default Form;
