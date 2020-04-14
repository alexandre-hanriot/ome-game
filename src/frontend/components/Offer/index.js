import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTitle } from 'src/hooks/useTitle';
import MapAutocomplete from 'react-google-autocomplete';
import classNames from 'classnames';

import Map from 'src/frontend/containers/Map';
import './offer.scss';

const Offer = ({ results, games, fetchGames }) => {
  useTitle('Trouver un jeu');
  const mapRef = useRef();
  const nbResults = results.length;

  useEffect(() => {
    fetchGames();
  }, []);

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
            <input type="text" placeholder="Nom du jeu" className="offer__aside__options__fields__game global-input" />
            <div className="offer__aside__options__fields__group">
              <select className="offer__aside__options__fields__disponibility global-select">
                <option value="">Disponibilité</option>
                <option value="1">Disponible</option>
                <option value="0">Non disponible</option>
              </select>
              <select className="offer__aside__options__fields__types global-select">
                <option value="">Type d'offre</option>
                <option value="1">Location</option>
                <option value="0">Prêt</option>
              </select>
            </div>
            <div className="offer__aside__options__fields__group">
              <select className="offer__aside__options__fields__categories global-select">
                <option value="">Catégorie</option>
                <option value="1">Jeux de rôle</option>
                <option value="2">Jeux de carte</option>
                <option value="3">Jeux de plateau</option>
                <option value="4">...</option>
              </select>
              <input type="text" placeholder="Nombre de joueurs" className="offer__aside__options__fields__range global-input" />
            </div>
          </div>
        </div>

        <div className="offer__aside__tags">
          <button type="button" className="offer__aside__tags__tag" title="Supprimer">68170</button>
          <button type="button" className="offer__aside__tags__tag" title="Supprimer">Rixheim</button>
          <button type="button" className="offer__aside__tags__tag" title="Supprimer">le parrain</button>
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
                    <p className="offer__aside__results__result__city">{result.user.postal_code}</p>
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
  fetchGames: PropTypes.func.isRequired,
};

export default Offer;
