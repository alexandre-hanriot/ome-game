/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useTitle } from 'src/hooks/useTitle';
import { formatDate } from 'src/utils/selectors';
import Loader from 'src/frontend/components/Loader';

import './form.scss';

const Form = ({
  fetchUser,
}) => {
  const { slug } = useParams();

  useTitle(`${slug === 'ajouter' ? 'Ajouter' : 'Modifier'} un utilisateurs`);

  useEffect(() => {
    if (slug !== 'ajouter') {
      fetchUser(slug);
    }
  }, []);

  return (
    <div className="wrapper">
      form
    </div>
  );
};

Form.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};

export default Form;
