import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useTitle } from 'src/hooks/useTitle';
import MapAutocomplete from 'react-google-autocomplete';
import classNames from 'classnames';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

import Map from 'src/frontend/containers/Map';
import './offer.scss';

const Offer = ({
  results,
  fetchGames,
  fetchGamesCategories,
  games,
  gamesCategories,
  fieldGame,
  fieldPlayers,
  changeFieldGame,
  changeFieldPlayers,
  filters,
  tags,
  changeFilterDisponibility,
  changeFilterType,
  changeFilterCategories,
  changeFilterGames,
  changeFilterPlayers,
  removeFilter,
}) => {
  useTitle('Trouver un jeu');
  const mapRef = useRef();
  const nbResults = results.length;

  // load data games and games categories
  useEffect(() => {
    fetchGames();
    fetchGamesCategories();
  }, []);

  const history = useHistory();

  // generate url with filters
  const generateUrl = () => {
    let { pathname } = history.location;

    if (filters.disponibility !== 'all') {
      pathname += `?disponibility=${filters.disponibility}`;
    }

    if (filters.type !== 'all') {
      pathname += `?type=${filters.type}`;
    }

    if (filters.categories.length > 0) {
      const ids = filters.categories.map((category) => category.id);
      pathname += `?categories=${ids.join('-')}`;
    }

    if (filters.games.length > 0) {
      const gamesList = filters.games.map((game) => encodeURIComponent(game));
      pathname += `?games=${gamesList.join('|')}`;
    }

    if (filters.players > 0) {
      pathname += `?players=${filters.players}`;
    }

    history.replace(pathname);
  };

  // updatefilter when filter is modified
  useEffect(() => {
    generateUrl();
  }, [filters]);

  // update disponibility filter
  const handleChangeDisponibility = (e) => {
    const { value, options } = e.target;
    if (value !== '') {
      const name = options[e.target.selectedIndex].text;
      changeFilterDisponibility(value, name);
      options.selectedIndex = '0';
    }
  };

  // update type filter
  const handleChangeType = (e) => {
    const { value, options } = e.target;
    if (value !== '') {
      const name = options[e.target.selectedIndex].text;
      changeFilterType(value, name);
      options.selectedIndex = '0';
    }
  };

  // update categories filter
  const handleChangeCategories = (e) => {
    const { value } = e.target;
    if (value !== '') {
      const { options } = e.target;
      const name = options[e.target.selectedIndex].text;
      changeFilterCategories(value, name);
      options.selectedIndex = '0';
    }
  };

  // save value players field
  const handleChangePlayers = (e) => {
    changeFieldPlayers(e.target.value);
  };

  // update games filter
  const handleClickGame = () => {
    changeFilterGames();
  };

  // update players filter
  const handleClickPlayers = () => {
    changeFilterPlayers();
  };

  const handleRemoveTag = (e) => {
    const { type, value } = e.target.dataset;
    removeFilter(type, value);
  };

  return (
    <div className="offer">
      <div className="offer__map">
        <Map mapRef={mapRef} />
      </div>

      <aside className="offer__aside">
        <h1 className="offer__aside__title">Trouver un jeu</h1>

        <form className="offer__aside__search">
          <MapAutocomplete
            className="offer__aside__search__input global-input"
            onPlaceSelected={(place) => {
              /*
              number of element :
              5 = ville
              3 = departement
              2 = region
              1 = pays
              */
              let zoom = 15;
              switch (place.address_components.length) {
                case 3:
                  zoom = 10;
                  break;
                case 2:
                  zoom = 8;
                  break;
                case 1:
                  zoom = 6;
                  break;
                default:
                  zoom = 15;
              }

              // change coordinates/zoom with the place
              mapRef.current.setZoom(zoom);
              mapRef.current.panTo({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });

              // update map after .5s (fix bug)
              const timeout = setTimeout(() => {
                mapRef.current.panTo({ lat: place.geometry.location.lat() + 0.00001, lng: place.geometry.location.lng() + 0.00001 });
                clearTimeout(timeout);
              }, 500);
            }}
            types={['(regions)']}
            componentRestrictions={{ country: 'fr' }}
          />
          <button type="submit" className="offer__aside__search__button" title="Rechercher"><i className="fas fa-search"> </i></button>
        </form>

        <div className="offer__aside__options">
          <button type="button" className="offer__aside__options__button">Options <i className="fas fa-sort-down"> </i></button>
          <div className="offer__aside__options__fields">
            <div className="offer__aside__options__fields__autocomplete">
              <TextInput
                value={fieldGame}
                placeholder="Nom du jeu"
                className="offer__aside__options__fields__game global-input"
                options={games}
                trigger=""
                spacer=""
                maxOptions={10}
                onChange={(value) => {
                  changeFieldGame(value);
                }}
              />
              <button type="submit" className="offer__aside__options__fields__autocomplete__button" title="Rechercher" onClick={handleClickGame}><i className="fas fa-plus-circle"> </i></button>
            </div>
            <div className="offer__aside__options__fields__group">
              <select className="offer__aside__options__fields__disponibility global-select" onChange={handleChangeDisponibility}>
                <option value="">Disponibilité</option>
                <option value="1">Disponible</option>
                <option value="0">Non disponible</option>
              </select>
              <select className="offer__aside__options__fields__types global-select" onChange={handleChangeType}>
                <option value="">Type d'offre</option>
                <option value="1">Location</option>
                <option value="0">Prêt</option>
              </select>
            </div>
            <div className="offer__aside__options__fields__group">
              <select className="offer__aside__options__fields__categories global-select" onChange={handleChangeCategories}>
                <option value="">Catégorie</option>
                {gamesCategories.map((category) => (
                  <option value={category.id} key={category.id}>{category.name}</option>
                ))}
              </select>
              <div className="offer__aside__options__fields__players">
                <input type="text" placeholder="Nombre de joueurs" className="offer__aside__options__fields__players__input" onChange={handleChangePlayers} value={fieldPlayers} />
                <button type="submit" className="offer__aside__options__fields__players__button" title="Rechercher" onClick={handleClickPlayers}><i className="fas fa-plus-circle"> </i></button>
              </div>
            </div>
          </div>
        </div>

        <div className="offer__aside__tags">
          {tags.map((tag) => (
            <button type="button" className="offer__aside__tags__tag" title="Supprimer" key={`${tag.type}-${tag.value}`} data-type={tag.type} data-value={tag.value} onClick={handleRemoveTag}>{tag.name}</button>
          ))}
        </div>

        <h2 className="offer__aside__subtitle">{nbResults} {nbResults > 1 ? 'résultats' : 'résultat'}</h2>

        <ul className="offer__aside__results">
          {results.map((result) => {
            const disponibilityClass = classNames('offer__aside__results__result__disponibility', { 'offer__aside__results__result__disponibility--off': !result.is_available });

            return (
              <Link to="/recherche/jeux/1-toto" key={result.id}>
                <li className="offer__aside__results__result">
                  <img src="https://cdn2.philibertnet.com/372889-large_default/le-parrain-l-empire-de-corleone.jpg" alt="" className="offer__aside__results__result__image" />
                  <div className="offer__aside__results__result__content">
                    <h3 className="offer__aside__results__result__name">{result.title}</h3>
                    <p className="offer__aside__results__result__city">{result.city} ({result.postal_code})</p>
                    <span className={disponibilityClass}>{result.is_available ? 'Disponible' : 'Non disponible'}</span>
                    <span className="offer__aside__results__result__type">{result.type === '0' ? 'Prêt' : 'Location'}</span>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

Offer.propTypes = {
  results: PropTypes.array.isRequired,
  games: PropTypes.array.isRequired,
  gamesCategories: PropTypes.array.isRequired,
  fetchGames: PropTypes.func.isRequired,
  fetchGamesCategories: PropTypes.func.isRequired,
  fieldGame: PropTypes.string.isRequired,
  fieldPlayers: PropTypes.string.isRequired,
  changeFieldGame: PropTypes.func.isRequired,
  changeFieldPlayers: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  changeFilterDisponibility: PropTypes.func.isRequired,
  changeFilterType: PropTypes.func.isRequired,
  changeFilterCategories: PropTypes.func.isRequired,
  changeFilterGames: PropTypes.func.isRequired,
  changeFilterPlayers: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
};

export default Offer;
