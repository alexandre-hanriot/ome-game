import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTitle } from 'src/hooks/useTitle';
import MapAutocomplete from 'react-google-autocomplete';

import './home.scss';

const Home = ({ changeCoordinates, changeZoom }) => {
  useTitle();
  const history = useHistory();

  return (
    <div className="wrapper wrapper-home">
      <div className="home">
        <h1 className="home__title">O`me Game</h1>
        <p className="home__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo nobis magnam cumque ullam libero sint iure. Magnam, voluptatum, explicabo dolores nesciunt rerum amet debitis ullam sunt cupiditate excepturi in optio Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, culpa labore perspiciatis fugiat ipsam distinctio aliquid! Tempore reprehenderit tenetur temporibus vel voluptatum.</p>
        <form className="home__form">
          {/* <input className="home__form__input global-input" placeholder="Saisissez un lieu" /> */}

          <MapAutocomplete
            className="home__form__input global-input"
            onPlaceSelected={(place) => {
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

              history.push('/recherche/jeux/');
            }}
            types={['(regions)']}
            componentRestrictions={{ country: 'fr' }}
          />

          <button className="home__form__button" type="button" label=""><i className="fas fa-search-location"> </i></button>
        </form>
      </div>
    </div>
  );
};

Home.propTypes = {
  changeCoordinates: PropTypes.func.isRequired,
  changeZoom: PropTypes.func.isRequired,
};

export default Home;
