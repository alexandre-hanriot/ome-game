import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './games.scss';
// bouton ajouter un jeu
// tableau jeux : nom - année d'édition - status - modifier - supprimer
const Games = ({
  getGames,
  getGameCategories,
  games,
  categories,
  isDeletedGames,
  gamesOn,
  gamesOff,
}) => {
  useEffect(() => {
    getGames();
    getGameCategories();
  }, []);

  const filterByStatusZeroOrOne = games.map((game) => {
    if (game.status !== '2') {
      return (
        <tr key={game.id}>
          <td><input type="checkbox" /></td>
          <td>{game.name}</td>
          <td>{game.year}</td>
          <td>{game.status === '0' ? 'en attente de validation' : 'validée'}</td>
          <td><i className="fas fa-pencil-alt"> </i></td>
          <td><i className="fas fa-trash-alt"> </i></td>
        </tr>
      );
    }
  });

  const filterByStatusTwo = games.map((game) => {
    if (game.status === '2') {
      return (
        <tr key={game.id}>
          <td><input type="checkbox" /></td>
          <td>{game.name}</td>
          <td>{game.year}</td>
          <td>{game.status === '2' ? 'supprimé' : ''}</td>
          <td><i className="fas fa-undo"> </i></td>
          <td><i className="fas fa-trash-alt"> </i></td>
        </tr>
      );
    }
  });

  return (
    <div className="wrapper admin-games">
      <h1>{isDeletedGames ? 'Jeux supprimé' : 'Jeux en cours'}</h1>
      <div className="admin-games__buttons">
        <button
          className="admin-games__buttons__button"
          type="button"
          onClick={gamesOn}
        >Jeux en cours
        </button>
        <button
          className="admin-games__buttons__button"
          type="button"
          onClick={gamesOff}
        >Jeux supprimé
        </button>
      </div>
      {!isDeletedGames && (
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Nom</th>
            <th>année d'édition</th>
            <th>Status</th>
            <th>modifier</th>
            <th>supprimer</th>
          </tr>
        </thead>
        <tbody>
          {filterByStatusZeroOrOne}
        </tbody>
      </table>
      )}
      {isDeletedGames && (
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Nom</th>
              <th>année d'édition</th>
              <th>Status</th>
              <th>retablir</th>
              <th>supprimer definitivement</th>
            </tr>
          </thead>
          <tbody>
            {filterByStatusTwo}
          </tbody>
        </table>
      )}
    </div>
  );
};

Games.propTypes = {
  getGames: PropTypes.func.isRequired,
  getGameCategories: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  isDeletedGames: PropTypes.bool.isRequired,
  gamesOn: PropTypes.func.isRequired,
  gamesOff: PropTypes.func.isRequired,
};

export default Games;
