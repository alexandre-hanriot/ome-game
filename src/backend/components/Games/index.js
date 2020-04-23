import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTitle } from 'src/hooks/useTitle';
import Loader from 'src/frontend/components/Loader';
import { Link } from 'react-router-dom';
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
  adminArchiveGame,
  adminRestoreGame,
  adminGetGames,
}) => {
  useTitle('Administration des jeux');

  const handleArchived = (gameId) => {
    async function load() {
      await adminArchiveGame(gameId);
      adminGetGames();
    }
    load();
  };
  const handleRestore = (gameId) => {
    async function load() {
      await adminRestoreGame(gameId);
      adminGetGames();
    }
    load();
  };

  useEffect(() => {
    getGames();
    getGameCategories();
  }, []);

  console.log('render');

  const filterByStatusZeroOrOne = games.filter((game) => game.status !== '2');
  const filterByStatusTwo = games.filter((game) => game.status === '2');

  return (
    <div className="wrapper admin-games">
      <h1>{isDeletedGames ? 'Jeux archivé' : 'Jeux en cours'}</h1>
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
        >Jeux archivé
        </button>
      </div>
      {games.length === 0 && <Loader />}
      {!isDeletedGames && (
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Nom</th>
            <th>année d'édition</th>
            <th>catégorie</th>
            <th>Status</th>
            <th>modifier</th>
            <th>archiver</th>
          </tr>
        </thead>
        <tbody>
          {filterByStatusZeroOrOne.map((game) => (
            <tr key={game.id}>
              <td><input type="checkbox" /></td>
              <td>{game.name}</td>
              <td>{game.year}</td>
              <td>{categories.map((category) => {
                if (category.id === game.gameCategoryId) {
                  return category.name;
                }
              })}
              </td>
              <td>{game.status === '0' ? 'en attente de validation' : 'validée'}</td>
              <td>
                <Link to={`admin/jeux/${game.id}/modifier`}>
                  <i className="fas fa-pencil-alt modify-game"> </i>
                </Link>
              </td>
              <td>
                <button className="button__archive" type="button" onClick={() => handleArchived(game.id)}>
                  <i className="fas fa-trash-alt archive-game"> </i>
                </button>
              </td>
            </tr>
          ))}
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
              <th>catégorie</th>
              <th>Status</th>
              <th>retablir</th>
              <th>supprimer</th>
            </tr>
          </thead>
          <tbody>
            {filterByStatusTwo.map((game) => (
              <tr key={game.id}>
                <td><input type="checkbox" /></td>
                <td>{game.name}</td>
                <td>{game.year}</td>
                <td>{categories.map((category) => {
                  if (category.id === game.gameCategoryId) {
                    return category.name;
                  }
                })}
                </td>
                <td>{game.status === '2' ? 'archivé' : ''}</td>
                <td>
                  <button className="button__restore" type="button" onClick={() => handleRestore(game.id)}>
                    <i className="fas fa-undo undo-game"> </i>
                  </button>
                </td>
                <td>
                  <Link to={`admin/jeux/${game.id}/supprimer`}>
                    <i className="fas fa-trash-alt delete-game"> </i>
                  </Link>
                </td>
              </tr>
            ))}
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
  adminArchiveGame: PropTypes.func.isRequired,
  adminRestoreGame: PropTypes.func.isRequired,
  adminGetGames: PropTypes.func.isRequired,
};

export default Games;
