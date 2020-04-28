import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTitle } from 'src/hooks/useTitle';
import MapAutocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode';

import './home.scss';

const Home = ({
  changeCoordinates,
  changeZoom,
}) => {
  useTitle();
  const history = useHistory();

  Geocode.setApiKey('AIzaSyAAUPUp27VoZaXgYvRwLCjgn5cZjpRIWjs');
  Geocode.setLanguage('fr');
  Geocode.setRegion('fr');

  const loadMap = (location, isAuto = false) => {
    let lat = 0;
    let lng = 0;

    if (isAuto) {
      lat = location.geometry.location.lat();
      lng = location.geometry.location.lng();
    }
    else {
      lat = location.geometry.location.lat;
      lng = location.geometry.location.lng;
    }

    let zoom = 14;
    switch (location.address_components.length) {
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

    changeZoom(zoom);
    changeCoordinates(lat, lng);

    const timeout = setTimeout(() => {
      changeCoordinates(lat + 0.00001, lng + 0.00001);
      clearTimeout(timeout);
    }, 1000);

    history.push('/recherche/jeux/');
  };

  const searchWithGeocode = (place) => {
    if (place !== '') {
      Geocode.fromAddress(place)
        .then(
          (response) => {
            loadMap(response.results[0]);
          },
          (error) => {
            console.error(error);
          },
        );
    }
  };

  return (
    <div className="wrapper wrapper-home">
      <div className="home">
        <h1 className="home__title">O`me Game</h1>
        <p className="home__text">
          Bienvenue ! Vous êtes arrivé sur un site de prêt et de location de jeux de société.
        </p>
        <p className="home__text">
          Le but c'est de pouvoir accéder à tous vos jeux préférés et d'en découvrir de nouveaux grâce à la communauté !
        </p>
        <p className="home__text">
          Pour commencer, vous pouvez acceder à la carte pour trouver un jeu près de chez vous en cliquant sur "trouver un jeu", ou simplement entrer le nom d'une ville ou d'un village juste en dessous de ce texte.
        </p>
        <div className="home__form">
          <MapAutocomplete
            className="home__form__input global-input"
            onPlaceSelected={(place) => {
              if (typeof place.address_components !== 'undefined' && typeof place.geometry !== 'undefined') {
                loadMap(place, true);
              }
              else {
                searchWithGeocode(place.name);
              }
            }}
            types={['(regions)']}
            componentRestrictions={{ country: 'fr' }}
          />

          <button className="home__form__button" type="button"><i className="fas fa-search-location"> </i></button>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  changeCoordinates: PropTypes.func.isRequired,
  changeZoom: PropTypes.func.isRequired,
};

export default Home;
