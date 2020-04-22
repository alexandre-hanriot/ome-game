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
    const globalParams = {
      orderby: 'id',
      sortby: 'DESC',
      limit: 4,
      resultPage: 1,
    };

    fetchAllUsers({
      ...globalParams,
      status: ['0', '1'],
    });
  }, []);

  return (
    <div>users</div>
  );
};

User.propTypes = {
  fetchAllUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};

export default User;
