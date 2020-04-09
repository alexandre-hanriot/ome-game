import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';

import Menu from './Menu';
import './header.scss';

const Header = ({ menuOpen, handleMenu }) => {
  const isMobile = useMediaPredicate('(max-width: 1024px)');

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" />
      </div>
      <nav className="header__nav">
        <div className="header__nav__menu">
          {!isMobile && <Menu />}
          {isMobile && (
            <>
              <button type="button" className="header__nav__menu__burger" onClick={handleMenu}><i className="fas fa-bars"> </i></button>
              {menuOpen && (
                <>
                  <div className="menu-background"> </div>
                  <div className="header__nav__menu__container" onClick={handleMenu}>
                    <Menu showIcon />
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="header__nav__account">
          <button type="button" className="header__nav__account__button" title="S'inscrire / Se connecter"><i className="fas fa-user"> </i></button>
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  handleMenu: PropTypes.func.isRequired,
};

export default Header;
