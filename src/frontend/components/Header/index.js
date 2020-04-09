import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './header.scss';
import logo from './logo.png';

const Header = () => (
  <header className="header">
    <div className="header__logo">
      <Link to="/"><img src={logo} alt="Logo O`me game" /></Link>
    </div>
    <nav className="header__nav">
      <div className="header__nav__menu">
        <button type="button" className="header__nav__menu__burger"><i className="fas fa-bars"> </i></button>
        <div className="header__nav__menu__container">
          <NavLink
            to="/"
            className="header__nav__menu__item"
            activeClassName="header__nav__menu__item--active"
            exact
          >
            Accueil
          </NavLink>
          <NavLink
            to="/recherche/jeux"
            className="header__nav__menu__item"
            activeClassName="header__nav__menu__item--active"
          >
            Trouver un jeu
          </NavLink>
          <NavLink
            to="/contact"
            className="header__nav__menu__item"
            activeClassName="header__nav__menu__item--active"
            exact
          >Contact
          </NavLink>
        </div>
      </div>
      <div className="header__nav__account">
        <button type="button" className="header__nav__account__button" title="S'inscrire / Se connecter"><i className="fas fa-user"> </i></button>
      </div>
    </nav>
  </header>
);

export default Header;
