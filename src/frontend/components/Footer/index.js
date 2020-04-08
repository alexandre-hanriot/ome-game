import React from 'react';
import { Link } from 'react-router-dom';

import './footer.scss';

const Footer = ({ isHome }) => {
  console.log(isHome);
  return (
    <footer className="footer">
      {!isHome && (
        <svg className="footer__background" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 120">
          <path
            fill="#2d3f57"
            d="M1920,2.21c-79.07,7.69-173.16,13.83-285.86,14.16c-128.06,0.37-131.89-7.19-353.28-8.6
          c-166.81-1.06-272.87-1.74-419.93,4.3c-114.14,4.69-208.87,11.61-358.61,5.38c-58.21-2.42-92.5-5.49-122.65-7.53
          C290,3.86,164.9,2.08,0,18.66V148h1920V2.21z"
          />
        </svg>
      )}
      <div className="footer__content">
        <div className="footer__content__copyright">
          &copy; O`me game - Tous droits réservés
        </div>
        <div className="footer__content__links">
          <Link className="footer__content__links__link" to="/a-propos">A propos</Link>
          <Link className="footer__content__links__link" to="/mentions-legales">Mentions légales</Link>
        </div>
        <div className="footer__content__socials">
          <Link className="footer__content__socials__link" title="Facebook"><i className="fab fa-facebook-square"> </i></Link>
          <Link className="footer__content__socials__link" title="Twitter"><i className="fab fa-twitter-square"> </i></Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
