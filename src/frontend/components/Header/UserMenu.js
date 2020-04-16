import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserMenu = ({ logOut }) => (
  <ul>
    <li className="header__nav__menu__user__list">
      <div className="header__nav__menu__user__icon"><i className="fas fa-home" /></div>
      <Link className="header__nav__menu__user__link" to="/compte">Mon tableau de bord</Link>
    </li>
    <li className="header__nav__menu__user__list">
      <div className="header__nav__menu__user__icon"><i className="fas fa-sign-out-alt" /></div>
      <Link className="header__nav__menu__user__link" to="/" onClick={logOut}>Me deconnecter</Link>
    </li>
  </ul>
);

UserMenu.propTypes = {
  logOut: PropTypes.func.isRequired,
};

export default UserMenu;
