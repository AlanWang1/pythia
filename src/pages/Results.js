import React from "react";
import "./Results.css";
import logo from "../img/Logo.svg";
import * as strings from '../constants/strings';

export default function Results(props) {

  const personality = (categories) => {

    const personality_score = '';

    if (categories[5] > (props.dominantColor.length - categories[5])) {
        personality_score+='E'
    } else {
        personality_score+='I'
    }

    if (categories[14] + categories[18] + categories[13] > categories[21] + categories[20] + categories[0]) {
        personality_score+='S'
    } else {
        personality_score+='N'
    }



  }

  return (
    <div>
      <section className="hero is-large has-text-centered">
      <img src={logo} className="image" id="logo" alt="logo" />
      </section>

      <div className="container has-text-centered">
        <h1 className="title is-1 is-primary"> Results </h1>
      </div>

      <section className = 'section'>
          <h1 className = 'title'> Who you are</h1>
          <h2 className = 'subtitle'> {strings.INFP_sum }</h2>
      </section>
    
      <section className = 'section'>
          <h1 className = 'title'> Your place in the universe</h1>
          <h2 className = 'subtitle'> {strings.Leo_sum} </h2>
      </section>

      <section className = 'section'>
          <h1 className = 'title'> Common themes of your life</h1>
          <h2 className = 'subtitle'> {strings.PastGenerate('nature', 'smiles')[0]} </h2>
          <h2 className = 'subtitle'> {strings.PastGenerate('social gathering', 'clouds')[2]} </h2>
      </section>

      <section className = 'section'>
          <h1 className = 'title'> Your past and present</h1>
          <h2 className = 'subtitle'>{strings.TopGenerate('buildings', 'roads')[0]} </h2>
          <h2 className = 'subtitle'>{strings.TopGenerate('paper', 'stones')[8]} </h2>
      </section>

    </div>
  );
}
