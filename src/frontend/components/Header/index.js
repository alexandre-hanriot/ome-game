import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import Modal from 'src/frontend/containers/Modal';
import Authentification from 'src/frontend/containers/Header/Authentification';
import UserMenu from 'src/frontend/containers/Header/UserMenu';
import Menu from './Menu';
import './header.scss';

const Header = ({
  showMenu, displayMenu, showModal, displayModal, isLogged, pseudo,
}) => {
  const isMobile = useMediaPredicate('(max-width: 1024px)');

  const handleModal = () => {
    displayModal('login');
  };

  const handleMenuBurger = () => {
    displayMenu('burger');
  };

  const handleMenuUser = () => {
    displayMenu('userMenu');
  };

  const handleMenuClose = () => {
    displayMenu();
  };

  return (
    <header className="header">
      {['login', 'registration', 'forgotPassword'].includes(showModal) && (
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
              <button type="button" className="header__nav__menu__burger" onClick={handleMenuBurger}><i className="fas fa-bars"> </i></button>
              {showMenu === 'burger' && (
                <>
                  <div className="menu-background" onClick={handleMenuClose}> </div>
                  <div className="header__nav__menu__container" onClick={handleMenuClose}>
                    <Menu showIcon />
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {isLogged && (
        <div className="header__nav__account">
          <div className="header__nav__account__hi">
            <p>Bienvenue {pseudo}</p>
          </div>
          <button type="button" className="header__nav__account__button" title="Mon compte / Se deconnecter" onClick={handleMenuUser}><i className="fas fa-user"> </i></button>
            {showMenu === 'userMenu'
            && (
              <>
                <div className="menu-background" onClick={handleMenuClose}> </div>
                <div className="header__nav__menu__user" onClick={handleMenuClose}>
                  <UserMenu />
                </div>
              </>
            )}
        </div>
        )}
        {!isLogged && (
        <div className="header__nav__account">
          <button type="button" className="header__nav__account__button" title="S'inscrire / Se connecter" onClick={handleModal}><i className="fas fa-user"> </i></button>
        </div>
        )}
      </nav>
    </header>
  );
};

Header.propTypes = {
  showMenu: PropTypes.string.isRequired,
  displayMenu: PropTypes.func.isRequired,
  showModal: PropTypes.string.isRequired,
  displayModal: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  pseudo: PropTypes.string,
};
Header.defaultProps = {
  pseudo: null,
};

export default Header;
