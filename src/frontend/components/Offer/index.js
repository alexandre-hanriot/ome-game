import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTitle } from 'src/hooks/useTitle';

import Loader from 'src/frontend/components/Loader';
import Search from 'src/frontend/containers/Offer/Search';
import './offer.scss';

const Offer = ({
  fetchGames,
  fetchGamesCategories,
  requestsLoad,
}) => {
  useTitle('Trouver un jeu');

  // load data games and games categories
  useEffect(() => {
    if (requestsLoad === 0) {
      fetchGames({
        status: '1',
      });
      fetchGamesCategories();
    }
  }, []);

  return (
    <>
      {requestsLoad < 2 && <Loader />}
      {requestsLoad === 2 && <Search />}
    </>
  );
};

Offer.propTypes = {
  fetchGames: PropTypes.func.isRequired,
  fetchGamesCategories: PropTypes.func.isRequired,
  requestsLoad: PropTypes.number.isRequired,
};

export default Offer;
