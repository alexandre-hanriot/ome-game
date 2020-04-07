import React from 'react';
import { Link } from 'react-router-dom';

import './footer.scss';

const Footer = () => (
  <footer className="footer">
    <div className="footer__copyright">
      &copy; O`me game - Tous droits réservés
    </div>
    <div className="footer__links">
      <Link className="footer__links__link">A propos</Link>
      <Link className="footer__links__link">Mentions légales</Link>
    </div>
    <div className="footer__socials">
      <Link className="footer__socials__link" title="Facebook"><i className="fab fa-facebook-square"> </i></Link>
      <Link className="footer__socials__link" title="Twitter"><i className="fab fa-twitter-square"> </i></Link>
    </div>
  </footer>
);

export default Footer;
