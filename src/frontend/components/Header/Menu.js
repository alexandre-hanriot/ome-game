import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Menu = ({ showIcon }) => (
  <>
    <NavLink
      to="/"
      className="header__nav__menu__item"
      activeClassName="header__nav__menu__item--active"
      exact
    >
      {showIcon && <i className="fas fa-arrow-circle-right"> </i>} Accueil
    </NavLink>
    <NavLink
      to="/recherche/jeux"
      className="header__nav__menu__item"
      activeClassName="header__nav__menu__item--active"
    >
      {showIcon && <i className="fas fa-arrow-circle-right"> </i>} Trouver un jeu
    </NavLink>
    <NavLink
      to="/contact"
      className="header__nav__menu__item"
      activeClassName="header__nav__menu__item--active"
      exact
    >{showIcon && <i className="fas fa-arrow-circle-right"> </i>} Contact
    </NavLink>
  </>
);

Menu.propTypes = {
  showIcon: PropTypes.bool,
};

Menu.defaultProps = {
  showIcon: false,
};

export default Menu;
