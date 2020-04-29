import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import MapAutocomplete from 'react-google-autocomplete';
import classNames from 'classnames';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import slugify from 'react-slugify';
import noimage from 'src/assets/images/noimage_150.jpg';

import Cluster from 'src/frontend/containers/Cluster';

const Offer = ({
  changeCoordinates,
  changeZoom,
  results,
  fetchOffers,
  games,
  gamesCategories,
  fieldGame,
  fieldPlayers,
  changeFieldGame,
  changeFieldPlayers,
  filters,
  filtersIsLoad,
  tags,
  changeFilterDisponibility,
  changeFilterType,
  changeFilterCategories,
  changeFilterGames,
  changeFilterPlayers,
  removeFilter,
  changeFilterLoad,
  showOptions,
  changeShowOptions,
}) => {
  const nbResults = results.length;
  const history = useHistory();

  useEffect(() => function cleanup() {
    changeFilterLoad();
  }, []);

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
      pathname += `?categories=${ids.join(',')}`;
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

  // update filters with url
  const updateFilters = (params) => {
    params.forEach((param) => {
      if (param !== '') {
        const data = param.split('=');
        const name = data[0];
        const value = data[1];

        if (name === 'disponibility') {
          changeFilterDisponibility(value, (value === '1' ? 'Disponible' : 'Non disponible'));
        }

        if (name === 'type') {
          changeFilterType(value, (value === '1' ? 'Location' : 'Prêt'));
        }

        if (name === 'players') {
          changeFieldPlayers(value);
          changeFilterPlayers();
        }

        if (name === 'categories') {
          const categories = value.split(',');
          categories.forEach((categoryId) => {
            const category = gamesCategories.find((cat) => cat.id === Number(categoryId));
            changeFilterCategories(categoryId, category.name);
          });
        }

        if (name === 'games') {
          const gamesList = value.split('|');
          gamesList.forEach((game) => {
            changeFieldGame(game.replace('%20', ' '));
            changeFilterGames();
          });
        }
      }
    });

    fetchOffers();
    changeFilterLoad();
  };

  // launch when filter is modified
  useEffect(() => {
    if (filtersIsLoad) {
      generateUrl();
      fetchOffers();
    }
    else {
      // if url has filters, update filters state
      const { search } = history.location;
      if (search.length > 0) {
        updateFilters(search.split('?'));
      }
      else {
        changeFilterLoad();
      }
    }
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

  // remove filter + tag
  const handleRemoveTag = (e) => {
    const { type, value } = e.target.dataset;
    removeFilter(type, value);
  };

  const optionsClass = classNames('offer__aside__options__fields', { 'offer__aside__options__fields--show': showOptions });
  const optionsButtonClass = classNames('offer__aside__options__button', { 'offer__aside__options__button--show': showOptions });

  return (
    <div className="offer">
      <div className="offer__map">
        <Cluster />
      </div>

      <aside className="offer__aside">
        <h1 className="offer__aside__title">Trouver un jeu</h1>

        <div className="offer__aside__search">
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
              let zoom = 14;
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
                  zoom = 14;
              }

              const lat = place.geometry.location.lat();
              const lng = place.geometry.location.lng();

              changeZoom(zoom);
              changeCoordinates(lat, lng);

              const timeout = setTimeout(() => {
                changeCoordinates(lat + 0.00001, lng + 0.00001);
                clearTimeout(timeout);
              }, 1000);
            }}
            types={['(regions)']}
            componentRestrictions={{ country: 'fr' }}
          />
          <button type="submit" className="offer__aside__search__button" title="Rechercher"><i className="fas fa-search"> </i></button>
        </div>

        <div className="offer__aside__options">
          <button type="button" className={optionsButtonClass} onClick={changeShowOptions}>Options</button>
          <div className={optionsClass}>
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
            <button type="button" className="offer__aside__tags__tag" title="Supprimer" key={`${tag.type}-${tag.value}`} data-type={tag.type} data-value={tag.value} onClick={handleRemoveTag}><i className="far fa-times" /> {tag.name}</button>
          ))}
        </div>

        <h2 className="offer__aside__subtitle">{nbResults} {nbResults > 1 ? 'résultats' : 'résultat'}</h2>

        <ul className="offer__aside__results">
          {results.map((result) => {
            const disponibilityClass = classNames('offer__aside__results__result__disponibility', { 'offer__aside__results__result__disponibility--off': !result.is_available });
            return (
              <Link to={`/recherche/jeux/${result.id}/${slugify(result.title, { lower: true })}`} key={result.id}>
                <li className="offer__aside__results__result">
                  <img src={result.image !== null ? `http://ec2-54-167-103-17.compute-1.amazonaws.com/images/offers/${result.image}` : noimage} alt="" className="offer__aside__results__result__image" />
                  <div className="offer__aside__results__result__content">
                    <div className="offer__aside__results__result__user">
                      {(result.user.picture !== null && result.user.picture !== '') && <img src={`http://ec2-54-167-103-17.compute-1.amazonaws.com/images/users/${result.user.picture}`} alt="" title={result.user.display_name ? `${result.user.firstname} ${result.user.lastname}` : result.user.username} />}
                      {(result.user.picture === null || result.user.picture === '') && <div className="offer__aside__results__result__user__noimage" title={result.user.display_name ? `${result.user.firstname} ${result.user.lastname}` : result.user.username}><i className="fas fa-user" /></div>}
                    </div>
                    <h3 className="offer__aside__results__result__name">{result.title}</h3>
                    <p className="offer__aside__results__result__city">{result.city} {result.postal_code !== '' ? `(${result.postal_code})` : ''}</p>
                    <p className="offer__aside__results__result__city">{result.game.name} {result.game.year != null && `(${result.game.year})`}</p>
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
  changeCoordinates: PropTypes.func.isRequired,
  changeZoom: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  games: PropTypes.array.isRequired,
  gamesCategories: PropTypes.array.isRequired,
  fieldGame: PropTypes.string.isRequired,
  fieldPlayers: PropTypes.string.isRequired,
  changeFieldGame: PropTypes.func.isRequired,
  changeFieldPlayers: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  filtersIsLoad: PropTypes.bool.isRequired,
  tags: PropTypes.array.isRequired,
  changeFilterDisponibility: PropTypes.func.isRequired,
  changeFilterType: PropTypes.func.isRequired,
  changeFilterCategories: PropTypes.func.isRequired,
  changeFilterGames: PropTypes.func.isRequired,
  changeFilterPlayers: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  fetchOffers: PropTypes.func.isRequired,
  changeFilterLoad: PropTypes.func.isRequired,
  showOptions: PropTypes.bool.isRequired,
  changeShowOptions: PropTypes.func.isRequired,
};

export default Offer;
