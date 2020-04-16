import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTitle } from 'src/hooks/useTitle';

import './notFound.scss';

const NotFound = ({ isError, changeIsError }) => {
  useTitle('Page introuvable');

  useEffect(() => {
    changeIsError();

    return function cleanup() {
      changeIsError();
    };
  }, []);


  return (
    <div className="wrapper wrapper-error-404">
      <div className="error-404">
        <h1 className="error-404__title">Oops !</h1>
        <p className="error-404__text">Nous sommes désolé pour le désagrément, il semblerait que vous avez essayé d'accéder à une page qui n'éxiste pas ou qui n'existe plus.</p>
        <Link className="error-404__link global-button global-button--light" to="/">Retourner à l'accueil</Link>
      </div>
    </div>
  );
};

NotFound.propTypes = {
  isError: PropTypes.bool.isRequired,
  changeIsError: PropTypes.func.isRequired,
};

export default NotFound;
