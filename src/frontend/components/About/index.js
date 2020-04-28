import React from 'react';
import { useTitle } from 'src/hooks/useTitle';

import './about.scss';

const About = () => {
  useTitle('A propos');

  return (
    <div className="wrapper about">
      <h1 className="about__title">A propos</h1>
      <p className="about__content">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et dolorum explicabo laudantium ducimus ut, deleniti quo iure dolore quisquam veniam, est voluptatum rem eum quos illum consectetur recusandae officia. Magnam.
        Itaque, explicabo reprehenderit harum beatae ducimus ratione blanditiis neque. Sed fugiat quidem commodi tempora quisquam numquam libero rem, quibusdam ea! Aut numquam quam reiciendis autem dolor amet vel incidunt molestias!
        Praesentium a adipisci unde tenetur, ullam atque at illo temporibus ex modi. Excepturi porro enim atque, laudantium tempora corrupti adipisci, dolorem quis, cum sint quam? Blanditiis, repellendus. Id, sint? Animi!
      </p>
      <ul className="about__team">
        <li className="about__team__member">
          <img className="about__team__member__image" src="https://images.unsplash.com/photo-1585251309844-3eec340559ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
          <h2 className="about__team__member__name">Jennifer</h2>
          <p className="about__team__member__job">Product Owner</p>
        </li>
        <li className="about__team__member">
          <img className="about__team__member__image" src="https://images.unsplash.com/flagged/photo-1563536310477-c7b4e3a800c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="" />
          <h2 className="about__team__member__name">Alexandre</h2>
          <p className="about__team__member__job">Scrum master</p>
        </li>
        <li className="about__team__member">
          <img className="about__team__member__image" src="https://images.unsplash.com/photo-1576206739726-574f5a1be5e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
          <h2 className="about__team__member__name">Jules</h2>
          <p className="about__team__member__job">Lead dev front</p>
        </li>
        <li className="about__team__member">
          <img className="about__team__member__image" src="https://lestribulationsdunfrancophoneenfrancophonie.files.wordpress.com/2015/08/madame-michu.png?w=584" alt="" />
          <h2 className="about__team__member__name">Stephane</h2>
          <p className="about__team__member__job">Lead dev back</p>
        </li>
      </ul>
    </div>
  );
};

export default About;
