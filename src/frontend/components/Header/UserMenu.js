import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './header.scss';

const UserMenu = ({ logOut }) => (
  <div>
    <Link className="header__nav__menu__user__link" to="/compte">Mon tableau de bord</Link>
    <Link className="header__nav__menu__user__link" to="/" onClick={logOut}>Me deconnecter</Link>
  </div>
);

UserMenu.propTypes = {
  logOut: PropTypes.func.isRequired,
};

export default UserMenu;
