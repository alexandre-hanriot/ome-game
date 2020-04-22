/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTitle } from 'src/hooks/useTitle';
import { truncateText, formatDate } from 'src/utils/selectors';
import Loader from 'src/frontend/components/Loader';

import './user.scss';

const User = ({
  fetchAllUsers,
  users,
}) => {
  useTitle('Liste des utilisateurs');

  useEffect(() => {
    fetchAllUsers({
      status: ['0'],
      orderby: 'username',
      sortby: 'ASC',
    });
  }, []);

  console.log(users);

  return (
    <div>
      <table>
        <thead>
          <th><input type="checkbox" /></th>
          <th>Pseudo</th>
          <th>Prénom Nom</th>
          <th>Email</th>
          <th>Inscrit le</th>
          <th>Status</th>
          <th></th>
        </thead>
        <tbody>
          <td><input type="checkbox" /></td>
          <td>Pseudo</td>
          <td>Prénom Nom</td>
          <td>Email</td>
          <td>Inscrit le</td>
          <td>Status</td>
          <td></td>
        </tbody>
      </table>
    </div>
  );
};

User.propTypes = {
  fetchAllUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};

export default User;
