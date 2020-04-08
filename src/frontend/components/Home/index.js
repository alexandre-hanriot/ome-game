import React from 'react';

import './home.scss';

const Home = () => (
  <div className="wrapper wrapper-home">
    <div className="home">
      <h1 className="home__title">O`me Game</h1>
      <p className="home__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo nobis magnam cumque ullam libero sint iure. Magnam, voluptatum, explicabo dolores nesciunt rerum amet debitis ullam sunt cupiditate excepturi in optio Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, culpa labore perspiciatis fugiat ipsam distinctio aliquid! Tempore reprehenderit tenetur temporibus vel voluptatum.</p>
      <form className="home__form">
        <input className="home__form__input" placeholder="Saisissez un lieu" />
        <button className="home__form__button" type="button" label=""><i className="fas fa-search-location"> </i></button>
      </form>
    </div>
  </div>
);

export default Home;
