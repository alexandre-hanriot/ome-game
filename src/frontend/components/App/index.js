// == Import npm
import React, { useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
  Route, Switch, useLocation, Redirect,
} from 'react-router-dom';

// Frontend
import Header from 'src/frontend/containers/Header';
import Footer from 'src/frontend/components/Footer';
import Home from 'src/frontend/containers/Home';
import About from 'src/frontend/components/About';
import Offer from 'src/frontend/containers/Offer';
import AccountProfil from 'src/frontend/containers/Account/Profil';
import AccountOffers from 'src/frontend/containers/Account/Offers';
import AccountOffersAdd from 'src/frontend/containers/Account/Offers/Form';
import LegalMentions from 'src/frontend/components/Legal-mentions';
import Contact from 'src/frontend/containers/Contact';
import Account from 'src/frontend/containers/Account';
import Details from 'src/frontend/containers/Offer/Details';
import Reservations from 'src/frontend/containers/Account/Reservations';
import NotFound from 'src/frontend/containers/NotFound';
import Alert from 'src/frontend/containers/Alert';

// Backend
import Admin from 'src/backend/containers/Home';
import AdminUser from 'src/backend/containers/User';

// == Composant
const App = ({
  isLogged,
  showAlert,
  isError,
  redirectTo,
  setRedirectTo,
  isTokenExist,
}) => {
  const location = useLocation();
  // return the current pathname
  const currentPath = location.pathname;
  const isHome = currentPath === '/';

  const appClass = classNames('app', {
    'app--light': isHome,
    'app--error': isError,
  });

  let redirectUrl = '';
  if (redirectTo.length > 0) {
    redirectUrl = redirectTo;
  }

  useEffect(() => {
    setRedirectTo('');
  }, [redirectTo]);

  useEffect(() => {
    if (!isLogged) {
      isTokenExist();
    }
  }, []);

  // TODO
  const inAdministration = currentPath.includes('/admin/');
  const isAdmin = true;

  return (
    <div className={appClass}>
      {redirectTo.length > 0 && <Redirect to={redirectUrl} />}
      <Header admin={(isAdmin && inAdministration)} />
      <main>
        {showAlert && <Alert />}
        <Switch>
          {isLogged && (
          <Route exact path="/compte">
            <Account />
          </Route>
          )}
          {isLogged && (
          <Route exact path="/compte/profil">
            <AccountProfil />
          </Route>
          )}
          {isLogged && (
          <Route exact path="/compte/reservations">
            <Reservations />
          </Route>
          )}
          {isLogged && (
          <Route exact path="/compte/offres">
            <AccountOffers />
          </Route>
          )}
          {isLogged && (
          <Route exact path="/compte/offres/ajouter">
            <AccountOffersAdd />
          </Route>
          )}
          {isLogged && (
          <Route exact path="/compte/offres/:slug">
            <AccountOffersAdd />
          </Route>
          )}
          {(isLogged && isAdmin && inAdministration) && (
          <Route exact path="/admin/">
            <Admin />
          </Route>
          )}
          {(isLogged && isAdmin && inAdministration) && (
          <Route exact path="/admin/utilisateurs">
            <AdminUser />
          </Route>
          )}
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/a-propos">
            <About />
          </Route>
          <Route exact path="/recherche/jeux">
            <Offer />
          </Route>
          <Route exact path="/mentions-legales">
            <LegalMentions />
          </Route>
          <Route exact path="/recherche/jeux/:id/:slug">
            <Details />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
      {(!isAdmin || !inAdministration) && <Footer isHome={isHome} />}
    </div>
  );
};

App.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  showAlert: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string.isRequired,
  setRedirectTo: PropTypes.func.isRequired,
  isTokenExist: PropTypes.func.isRequired,
};
// == Export
export default App;
