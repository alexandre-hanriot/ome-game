import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTitle } from 'src/hooks/useTitle';
import MapAutocomplete from 'react-google-autocomplete';
import classNames from 'classnames';

import Map from 'src/frontend/containers/Map';
import './offer.scss';

const Offer = ({ changeCoordinates, changeZoom, results }) => {
  useTitle('Trouver un jeu');
  const mapRef = useRef();

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
              // console.log(place.address_components.length);
              /*
              5 = ville     15
              3 = departement  9
              2 = region    8
              1 = pays      6
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

              mapRef.current.setZoom(zoom);
              mapRef.current.panTo({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });

              const timeout = setTimeout(() => {
                mapRef.current.panTo({ lat: place.geometry.location.lat() + 0.00001, lng: place.geometry.location.lng() + 0.00001 });
                clearTimeout(timeout);
              }, 500);
            }}
            types={['(regions)']}
            componentRestrictions={{ country: 'fr' }}
          />

          {/* <input type="text" placeholder="Saisissez un lieu" className="offer__aside__search__input global-input" /> */}
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
              <input type="text" placeholder="Autour (km)" className="offer__aside__options__fields__range global-input" />
            </div>
          </div>
        </div>

        <div className="offer__aside__tags">
          <button type="button" className="offer__aside__tags__tag" title="Supprimer">68170</button>
          <button type="button" className="offer__aside__tags__tag" title="Supprimer">Rixheim</button>
          <button type="button" className="offer__aside__tags__tag" title="Supprimer">le parrain</button>
        </div>

        <h2 className="offer__aside__subtitle">Résultat(s)</h2>

        <ul className="offer__aside__results">
          {results.map((result) => {
            const disponibilityClass = classNames('offer__aside__results__result__disponibility', { 'offer__aside__results__result__disponibility--off': !result.disponibility });

            return (
              <Link to="/recherche/jeux/1-toto" key={result.id}>
                <li className="offer__aside__results__result">
                  <img src="https://cdn2.philibertnet.com/372889-large_default/le-parrain-l-empire-de-corleone.jpg" alt="" className="offer__aside__results__result__image" />
                  <div className="offer__aside__results__result__content">
                    <h3 className="offer__aside__results__result__name">{result.name}</h3>
                    <p className="offer__aside__results__result__city">{result.location}</p>
                    <span className={disponibilityClass}>{result.disponibility ? 'Disponible' : 'Non disponible'}</span>
                    <span className="offer__aside__results__result__type">{result.type === 'pret' ? 'Prêt' : 'Location'}</span>
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
};

export default Offer;
