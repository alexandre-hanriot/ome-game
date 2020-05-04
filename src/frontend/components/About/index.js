import React from 'react';
import { useTitle } from 'src/hooks/useTitle';

import './about.scss';

const About = () => {
  useTitle('A propos');

  return (
    <div className="wrapper about">
      <h1 className="about__title">A propos</h1>
      <p className="about__content">
        Nous sommes une équipe de 3 développeurs et une developpeuse ayant suivi la formation complète de O'clock. Notre équipe est une équipe en fullstack javascript.
      </p>
      <p className="about__content">
        Constitué de 3 développeurs frontend utilisant React et un developpeur backend sur node.js et une base de données en postgres.
      </p>
      <p className="about__content">
        Nous sommes ravis d'avoir mené le projet O'me Game à sa version 1.0.
        Ce fût une aventure riche en enseignement et nous en sortons grandis !
      </p>
      <ul className="about__team">
        <li className="about__team__member">
          <img className="about__team__member__image" src="https://i.pinimg.com/originals/76/47/9d/76479dd91dc55c2768ddccfc30a4fbf5.png" alt="" />
          <h2 className="about__team__member__name">Jennifer</h2>
          <p className="about__team__member__job">Product Owner</p>
        </li>
        <li className="about__team__member">
          <img className="about__team__member__image" src="https://img-0.journaldunet.com/tYYYSYZA5iQTOn3Wio7MxzCVsHM=/1280x/smart/63bbee8129fe4e489d0b0f98a99b512c/ccmcms-jdn/11547067.jpg" alt="" />
          <h2 className="about__team__member__name">Alexandre</h2>
          <p className="about__team__member__job">Scrum master</p>
        </li>
        <li className="about__team__member">
          <img className="about__team__member__image" src="https://www.s0ak.fr/prive/minion.jpg" alt="" />
          <h2 className="about__team__member__name">Jules</h2>
          <p className="about__team__member__job">Lead dev front</p>
        </li>
        <li className="about__team__member">
          <img className="about__team__member__image" src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB12ePSI.img?h=799&w=799&m=6&q=60&o=f&l=f&x=492&y=191" alt="" />
          <h2 className="about__team__member__name">Stephane</h2>
          <p className="about__team__member__job">Lead dev back</p>
        </li>
      </ul>
    </div>
  );
};

export default About;
