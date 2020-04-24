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
      <h1 className="account-offers-form__title"> une offre</h1>
        <div className="account-offers-form__container">
          <div className="account-offers-form__container__left">
            <h2 className="account-offers-form__subtitle">Jeu</h2>
          </div>

          <div className="account-offers-form__container__right">
            <div className="account-offers-form__block account-offers-form__block--flex50">
              <div className="account-offers-form__disponibility">
                <h2 className="account-offers-form__subtitle">Disponibilité</h2>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="is_available"
                      checked=""
                      onChange=""
                      value="1"
                    /> Disponible
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="is_available"
                      checked=""
                      onChange=""
                      value="0"
                    /> Non disponible
                  </label>
                </div>
              </div>
            </div>

            <div className="account-offers-form__block">
              <h2 className="account-offers-form__subtitle">Type</h2>
              <div className="account-offers-form__type">
                <select className="global-select" name="type" onChange="{changeInput}" value="{offer.type}">
                  <option
                    value="1"
                  >Location
                  </option>
                  <option
                    value="0"
                  >Prêt
                  </option>
                </select>
                <input
                  type="text"
                  placeholder="Prix (€)"
                  className="global-input"
                  value="{offer.price}"
                  onChange="{changeInput}"
                  name="price"
                  disabled="{offer.type === '0'}"
                />
              </div>
            </div>

            <div className="account-offers-form__block">
              <h2 className="account-offers-form__subtitle">Image</h2>

            </div>
          </div>
        </div>
    </div>
  );
};

Form.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};

export default Form;
