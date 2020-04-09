import React from 'react';
import { Link } from 'react-router-dom';
import './offers.scss';

const AccountOffers = () => (
  <div className="wrapper accountOffers">
    <div className="reservations__breadcrumb">
      <Link to="/">Accueil ></Link>
      <Link to="/compte"> Mon compte > </Link>
      Offres
    </div>
    <h1 className="accountOffers__title">Mes Offres</h1>
    <ul className="accountOffers__listOffers">
      <li className="accountOffers__listOffers__offer">
        <div className="accountOffers__listOffers__offer__left">
          <img className="accountOffers__listOffers__offer__left__picture" src="https://cdn3.trictrac.net/documents/formats/thumb_300_300/documents/originals/29/2c/676d3ba08cf231daf0fc67c709bc0ba8a6468f2fb878061c99c16e6f751d.jpeg" alt="" />
          <div className="accountOffers__listOffers__offer__left__content">
            <h2 className="accountOffers__listOffers__offer__left__content__subtitle">Nom de l'offre <span className="accountOffers__listOffers__offer__left__content__subtitle__euro">(5 €)</span></h2>
            <h3 className="">Nom du jeu : 7 Wonders</h3>
            <h3>Client : Mme Michu</h3>
            <h3>Date : xx / xx /xx</h3>
          </div>
          <div
            className="accountOffers__listOffers__offer__left__status"
          >status
          </div>
        </div>
        <div className="accountOffers__listOffers__offer__right">
          <button className="" type="button"> <i className="fas fa-pencil-alt accountOffers__listOffers__offer__right__pencil" /> <Link> Modifier</Link></button>
          <button className="" type="button"> <i className="fas fa-trash-alt accountOffers__listOffers__offer__right__trash" /> Supprimer</button>
        </div>
      </li>
      <li className="accountOffers__listOffers__offer">
        <div className="accountOffers__listOffers__offer__left">
          <img className="accountOffers__listOffers__offer__left__picture" src="https://cdn3.trictrac.net/documents/formats/thumb_300_300/documents/originals/29/2c/676d3ba08cf231daf0fc67c709bc0ba8a6468f2fb878061c99c16e6f751d.jpeg" alt="" />
          <div className="accountOffers__listOffers__offer__left__content">
            <h2 className="accountOffers__listOffers__offer__left__content__subtitle">Nom de l'offre <span className="accountOffers__listOffers__offer__left__content__subtitle__euro">(5 €)</span></h2>
            <h3 className="">Nom du jeu : 7 Wonders</h3>
            <h3>Client : Mme Michu</h3>
            <h3>Date : xx / xx /xx</h3>
          </div>
          <div
            className="accountOffers__listOffers__offer__left__status"
          >status
          </div>
        </div>
        <div className="accountOffers__listOffers__offer__right">
          <button className="" type="button"> <i className="fas fa-pencil-alt accountOffers__listOffers__offer__right__pencil" /> Modifier</button>
          <button className="" type="button"> <i className="fas fa-trash-alt accountOffers__listOffers__offer__right__trash" /> Supprimer</button>
        </div>
      </li>

    </ul>
  </div>
);

export default AccountOffers;
