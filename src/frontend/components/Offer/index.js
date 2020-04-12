import React from 'react';
import { Link } from 'react-router-dom';
import { useTitle } from 'src/hooks/useTitle';

import './offer.scss';


const Offer = () => {
  useTitle('Trouver un jeu');


  return (
    <div className="offer">
      <div className="offer__map"> </div>

      <aside className="offer__aside">
        <h1 className="offer__aside__title">Trouver un jeu</h1>

        <form className="offer__aside__search">
          <input type="text" placeholder="Saisissez un lieu" className="offer__aside__search__input global-input" />
          <button type="submit" className="offer__aside__search__button" title="Rechercher"><i className="fas fa-search"> </i></button>
        </form>

        <div className="offer__aside__options">
          <button type="button" className="offer__aside__options__button">Options <i className="fas fa-sort-down"> </i></button>
          <div className="offer__aside__options__fields">
            <input type="text" placeholder="Nom du jeu" className="offer__aside__options__fields__game global-input" />
            <div className="offer__aside__options__fields__group">
              <select className="offer__aside__options__fields__disponibility global-select">
                <option value="">Disponibilité</option>
                <option value="1">Disponible</option>
                <option value="0">Non disponible</option>
              </select>
              <select className="offer__aside__options__fields__types global-select">
                <option value="">Type d'offre</option>
                <option value="1">Location</option>
                <option value="0">Prêt</option>
              </select>
            </div>
            <div className="offer__aside__options__fields__group">
              <select className="offer__aside__options__fields__categories global-select">
                <option value="">Catégorie</option>
                <option value="1">Jeux de rôle</option>
                <option value="2">Jeux de carte</option>
                <option value="3">Jeux de plateau</option>
                <option value="4">...</option>
              </select>
              <input type="text" placeholder="Autour (km)" className="offer__aside__options__fields__range global-input" />
            </div>
          </div>
        </div>

        <div className="offer__aside__tags">
          <button type="button" className="offer__aside__tags__tag" title="Supprimer">68170</button>
          <button type="button" className="offer__aside__tags__tag" title="Supprimer">Rixheim</button>
          <button type="button" className="offer__aside__tags__tag" title="Supprimer">le parrain</button>
        </div>

        <h2 className="offer__aside__subtitle">Résultat(s)</h2>

        <ul className="offer__aside__results">
          <Link to="/recherche/jeux/1-toto">
            <li className="offer__aside__results__result">
              <img src="https://cdn2.philibertnet.com/372889-large_default/le-parrain-l-empire-de-corleone.jpg" alt="" className="offer__aside__results__result__image" />
              <div className="offer__aside__results__result__content">
                <h3 className="offer__aside__results__result__name">Le parrain (2018)</h3>
                <p className="offer__aside__results__result__city">Rixheim (68170)</p>
                <span className="offer__aside__results__result__disponibility">Disponible</span>
                <span className="offer__aside__results__result__type">Location</span>
              </div>
            </li>
          </Link>
          <Link to="/recherche/jeux/1-toto">
            <li className="offer__aside__results__result">
              <img src="https://cdn2.philibertnet.com/372889-large_default/le-parrain-l-empire-de-corleone.jpg" alt="" className="offer__aside__results__result__image" />
              <div className="offer__aside__results__result__content">
                <h3 className="offer__aside__results__result__name">Le parrain (2018)</h3>
                <p className="offer__aside__results__result__city">Habsheim (68440)</p>
                <span className="offer__aside__results__result__disponibility">Disponible</span>
                <span className="offer__aside__results__result__type">Prêt</span>
              </div>
            </li>
          </Link>
          <Link to="/recherche/jeux/1-toto">
            <li className="offer__aside__results__result">
              <img src="https://cdn2.philibertnet.com/372889-large_default/le-parrain-l-empire-de-corleone.jpg" alt="" className="offer__aside__results__result__image" />
              <div className="offer__aside__results__result__content">
                <h3 className="offer__aside__results__result__name">Le parrain (2006)</h3>
                <p className="offer__aside__results__result__city">Mulhouse (68100)</p>
                <span className="offer__aside__results__result__disponibility offer__aside__results__result__disponibility--off">Non disponible</span>
                <span className="offer__aside__results__result__type">Location</span>
              </div>
            </li>
          </Link>
        </ul>

      </aside>
    </div>
  );
};

export default Offer;
