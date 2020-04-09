import React from 'react';
import { Link } from 'react-router-dom';
import './reservations.scss';

const Reservations = () => (
  <div className="wrapper reservations">
    <div className="reservations__breadcrumb"> 
      <Link to="/">Accueil ></Link>
      <Link to="/compte"> Mon compte ></Link>
      <Link to="/compte/reservations"> Mes reservations</Link>
    </div>
    <h1 className="reservations__title">Mes réservations</h1>
    <ul>
      <li className="reservations__container">
        <div className="reservations__container__item">
          <div className="reservations__container__item__left">
            <img className="reservations__container__item__left__picture" src="https://cdn3.trictrac.net/documents/formats/thumb_300_300/documents/originals/29/2c/676d3ba08cf231daf0fc67c709bc0ba8a6468f2fb878061c99c16e6f751d.jpeg" alt="" />
            <div className="reservations__container__item__left__text">
              <h2 className="reservations__container__item__left__text__subtitle">Nom de l'offre gggggggggggggggggggggggggggggggggg<span className="reservations__container__item__left__text__status">Status</span></h2>
              <h3 className="reservations__container__item__left__text__third">Nom du jeu</h3>
            </div>
          </div>
          <div className="reservations__container__item__right">
            <button className="reservations__container__item__right__button" type="button"> <i className="far fa-eye" /> Voir plus</button>
            <button className="reservations__container__item__right__button" type="button"> <i className="fas fa-times" /> Annuler</button>
          </div>
        </div>
      </li>

      <li className="reservations__container">
        <div className="reservations__container__item">
          <div className="reservations__container__item__left">
            <img className="reservations__container__item__left__picture" src="https://cdn3.trictrac.net/documents/formats/thumb_300_300/documents/originals/29/2c/676d3ba08cf231daf0fc67c709bc0ba8a6468f2fb878061c99c16e6f751d.jpeg" alt="" />
            <div className="reservations__container__item__left__text">
              <h2 className="reservations__container__item__left__text__subtitle">Nom de l'offre <span className="reservations__container__item__left__text__status">Status</span></h2>
              <h3 className="reservations__container__item__left__text__third">Nom du jeu</h3>
            </div>
          </div>
          <div className="reservations__container__item__right">
            <button className="reservations__container__item__right__button" type="button"> <i className="far fa-eye" /> Voir plus</button>
            <button className="reservations__container__item__right__button" type="button"> <i className="fas fa-times" /> Annuler</button>
          </div>
        </div>
      </li>

      <li className="reservations__container">
        <div className="reservations__container__item">
          <div className="reservations__container__item__left">
            <img className="reservations__container__item__left__picture" src="https://cdn3.trictrac.net/documents/formats/thumb_300_300/documents/originals/29/2c/676d3ba08cf231daf0fc67c709bc0ba8a6468f2fb878061c99c16e6f751d.jpeg" alt="" />
            <div className="reservations__container__item__left__text">
              <h2 className="reservations__container__item__left__text__subtitle">Nom de l'offre <span className="reservations__container__item__left__text__status">Status</span></h2>
              <h3 className="reservations__container__item__left__text__third">Nom du jeu</h3>
            </div>
          </div>
          <div className="reservations__container__item__right">
            <button className="reservations__container__item__right__button" type="button"> <i className="far fa-eye" /> Voir plus</button>
            <button className="reservations__container__item__right__button" type="button"> <i className="fas fa-times" /> Annuler</button>
          </div>
        </div>
      </li>

      <li className="reservations__container">
        <div className="reservations__container__item">
          <div className="reservations__container__item__left">
            <img className="reservations__container__item__left__picture" src="https://cdn3.trictrac.net/documents/formats/thumb_300_300/documents/originals/29/2c/676d3ba08cf231daf0fc67c709bc0ba8a6468f2fb878061c99c16e6f751d.jpeg" alt="" />
            <div className="reservations__container__item__left__text">
              <h2 className="reservations__container__item__left__text__subtitle">Nom de l'offre <span className="reservations__container__item__left__text__status">Status</span></h2>
              <h3 className="reservations__container__item__left__text__third">Nom du jeu</h3>
            </div>
          </div>
          <div className="reservations__container__item__right">
            <button className="reservations__container__item__right__button" type="button"> <i className="far fa-eye" /> Voir plus</button>
            <button className="reservations__container__item__right__button" type="button"> <i className="fas fa-times" /> Annuler</button>
          </div>
        </div>
      </li>

      <li className="reservations__container">
        <div className="reservations__container__item">
          <div className="reservations__container__item__left">
            <img className="reservations__container__item__left__picture" src="https://cdn3.trictrac.net/documents/formats/thumb_300_300/documents/originals/29/2c/676d3ba08cf231daf0fc67c709bc0ba8a6468f2fb878061c99c16e6f751d.jpeg" alt="" />
            <div className="reservations__container__item__left__text">
              <h2 className="reservations__container__item__left__text__subtitle">Nom de l'offre <span className="reservations__container__item__left__text__status">Status</span></h2>
              <h3 className="reservations__container__item__left__text__third">Nom du jeu</h3>
            </div>
          </div>
          <div className="reservations__container__item__right">
            <button className="reservations__container__item__right__button" type="button"> <i className="far fa-eye" /> Voir plus</button>
            <button className="reservations__container__item__right__button" type="button"> <i className="fas fa-times" /> Annuler</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
);

export default Reservations;
