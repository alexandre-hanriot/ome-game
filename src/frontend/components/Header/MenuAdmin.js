import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const MenuAdmin = ({ showIcon }) => (
  <>
    <NavLink
      to="/admin/"
      className="header__nav__menu__item"
      activeClassName="header__nav__menu__item--active"
      exact
    >
      {showIcon && <i className="fas fa-arrow-circle-right"> </i>} Accueil
    </NavLink>
    <NavLink
      to="/admin/utilisateurs"
      className="header__nav__menu__item"
      activeClassName="header__nav__menu__item--active"
    >
      {showIcon && <i className="fas fa-arrow-circle-right"> </i>} Utilisateurs
    </NavLink>
    <NavLink
      to="/admin/offres"
      className="header__nav__menu__item"
      activeClassName="header__nav__menu__item--active"
      exact
    >{showIcon && <i className="fas fa-arrow-circle-right"> </i>} Offres
    </NavLink>
    <NavLink
      to="/admin/jeux"
      className="header__nav__menu__item"
      activeClassName="header__nav__menu__item--active"
      exact
    >{showIcon && <i className="fas fa-arrow-circle-right"> </i>} Jeux
    </NavLink>
  </>
);

MenuAdmin.propTypes = {
  showIcon: PropTypes.bool,
};

MenuAdmin.defaultProps = {
  showIcon: false,
};

export default MenuAdmin;
