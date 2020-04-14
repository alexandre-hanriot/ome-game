import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const UserMenu = () => (
  <div>
    <Link className="header__nav__menu__user__link" to="/compte">Mon tableau de bord</Link>
    <Link className="header__nav__menu__user__link" to="#">Me deconnecter</Link>
  </div>
);

export default UserMenu;
