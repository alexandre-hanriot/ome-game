// == Import npm
import React from 'react';
import classNames from 'classnames';
import { Route, Switch, useLocation } from 'react-router-dom';

import Header from 'src/frontend/containers/Header';
import Footer from 'src/frontend/components/Footer';

import Home from 'src/frontend/components/Home';
import About from 'src/frontend/components/About';
import Offer from 'src/frontend/components/Offer';
import AccountProfil from 'src/frontend/components/Account/Profil';
import AccountOffersAdd from 'src/frontend/components/Account/Offers/Form';
import LegalMentions from 'src/frontend/components/Legal-mentions';
import Contact from 'src/frontend/components/Contact';
import Details from 'src/frontend/components/Offer/Details';
import Reservations from 'src/frontend/containers/Account/Reservations';

// == Composant
const App = () => {
  const location = useLocation();
  // return the current pathname
  const currentPath = location.pathname;

  const isHome = currentPath === '/';
  const appClass = classNames('app', { 'app--light': isHome });

  return (
    <div className={appClass}>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/a-propos">
            <About />
          </Route>
          <Route exact path="/recherche/jeux">
            <Offer />
          </Route>
          <Route exact path="/compte/profil">
            <AccountProfil />
          </Route>
          <Route exact path="/compte/offres/ajouter">
            <AccountOffersAdd />
          </Route>
          <Route exact path="/mentions-legales">
            <LegalMentions />
          </Route>
          <Route exact path="/recherche/jeux/1-toto">
            <Details />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/compte/reservations">
            <Reservations />
          </Route>
          <Route>
            <p>erreur 404</p>
          </Route>
        </Switch>
      </main>
      <Footer isHome={isHome} />
    </div>
  );
};

// == Export
export default App;
