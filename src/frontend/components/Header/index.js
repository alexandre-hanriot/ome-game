import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import Modal from 'src/frontend/containers/Modal';

import Authentification from 'src/frontend/containers/Header/Authentification';
import Menu from './Menu';
import './header.scss';

const Header = ({ showMenu, displayMenu, showModal, displayModal }) => {
  const isMobile = useMediaPredicate('(max-width: 1024px)');

  const handleModal = () => {
    displayModal('login');
  };

  return (
    <header className="header">
      {['login', 'registration'].includes(showModal) && (
        <Modal content={<Authentification />} />
      )}

      <div className="header__logo">
        <Link to="/" />
      </div>
      <nav className="header__nav">
        <div className="header__nav__menu">
          {!isMobile && <Menu />}
          {isMobile && (
            <>
              <button type="button" className="header__nav__menu__burger" onClick={displayMenu}><i className="fas fa-bars"> </i></button>
              {showMenu && (
                <>
                  <div className="menu-background"> </div>
                  <div className="header__nav__menu__container" onClick={displayMenu}>
                    <Menu showIcon />
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="header__nav__account">
          <button type="button" className="header__nav__account__button" title="S'inscrire / Se connecter" onClick={handleModal}><i className="fas fa-user"> </i></button>
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  showMenu: PropTypes.bool.isRequired,
  displayMenu: PropTypes.func.isRequired,
  showModal: PropTypes.string.isRequired,
  displayModal: PropTypes.func.isRequired,
};

export default Header;
