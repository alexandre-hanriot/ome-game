/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTitle } from 'src/hooks/useTitle';
import { formatDate } from 'src/utils/selectors';
import Loader from 'src/frontend/components/Loader';

import './user.scss';

const User = ({
  fetchAllUsers,
  users,
}) => {
  useTitle('Liste des utilisateurs');

  useEffect(() => {
    fetchAllUsers({
      status: ['0', '1'],
      orderby: 'username',
      sortby: 'ASC',
    });
  }, []);

  return (
    <div className="wrapper admin-users">
      <div className="admin-dashboard__breadcrumb">
        <Link to="/admin/">Accueil</Link> > Liste des utilisateurs
      </div>

      <div className="admin-users__title">
        <h1>Liste des utilisateurs</h1>
        <Link className="global-button" to="/admin/utilisateurs/ajouter">Ajouter</Link>
      </div>

      {users.length === 0 && <Loader />}
      {users.length > 0 && (
        <table className="admin-users__table">
          <thead className="admin-users__table__thead">
            <tr>
              <th><input type="checkbox" /></th>
              <th>Pseudo</th>
              <th>Prénom Nom</th>
              <th>Email</th>
              <th>Inscrit le</th>
              <th>Status</th>
              <th> </th>
            </tr>
          </thead>
          <tbody className="admin-users__table__tbody">
            {users.map((user) => {
              const statusClass = classNames('admin-users__table__status', {
                'admin-users__table__status--wait': user.status === '0',
                'admin-users__table__status--active': user.status === '1',
              });
              const statusIconClass = classNames('fas', {
                'fa-dot-circle': user.status === '0',
                'fa-check-circle': user.status === '1',
              });
              return (
                <tr key={user.id}>
                  <td><input type="checkbox" /></td>
                  <td className="admin-users__table__username">{user.username}</td>
                  <td>{user.firstname} {user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{formatDate(user.createdAt, true)}</td>
                  <td className={statusClass}><i className={statusIconClass} title={user.status === '0' ? 'En attente de validation' : 'Validée'} /></td>
                  <td className="admin-users__table__action">
                    <Link to={`/admin/utilisateurs/${user.id}`} className="edit" title="Modifier"><i className="fas fa-pen" /></Link>
                    <Link to="/admin/utilisateurs/" className="remove" title="Supprimer"><i className="fas fa-trash-alt" /></Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

User.propTypes = {
  fetchAllUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};

export default User;
