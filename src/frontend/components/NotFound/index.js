import React from 'react';
import './notFound.scss';
import Logo from 'src/assets/images/logo.svg';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="wrapper not-found">
    <div className="not-found__content">
      <h1 className="not-found__content__title">
        <span className="not-found__content__title__item--one">p</span>
        <span className="not-found__content__title__item--two">a</span>
        <span className="not-found__content__title__item--three">g</span>
        <span className="not-found__content__title__item--one">e </span>
        <span className="not-found__content__title__item--two">n</span>
        <span className="not-found__content__title__item--three">o</span>
        <span className="not-found__content__title__item--one">n </span>
        <span className="not-found__content__title__item--two">t</span>
        <span className="not-found__content__title__item--three">r</span>
        <span className="not-found__content__title__item--one">o</span>
        <span className="not-found__content__title__item--two">u</span>
        <span className="not-found__content__title__item--three">v</span>
        <span className="not-found__content__title__item--one">é</span>
        <span className="not-found__content__title__item--two">e</span>
      </h1>
      <p className="not-found__content__text">Oops ! Mais pourquoi vous êtes ici ?</p>
      <p className="not-found__content__text">Nous sommes désolé pour le désagrément, il semblerait que vous avez essayé d'accéder à une page qui à été supprimé ou qui n'a jamais existé.
      </p>
      <Link className="not-found__content__link global-button" to="/"> Retourner à l'accueil </Link>
    </div>
    <div className="not-found__image">
      <img src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569_960_720.jpg" alt="" />
    </div>
  </div>
);

export default NotFound;
