import React from "react";
import "./Results.css";
import logo from "../img/Logo.svg";
import * as strings from '../constants/strings';

export default function Results(props) {

  const personality = (categories) => {

    let personality_score = '';

    if (categories[5] >= (props.dominantColors.length - categories[5])) {
        personality_score+='E'
    } else {
        personality_score+='I'
    }

    if (categories[14] + categories[18] + categories[13] >= categories[21] + categories[20] + categories[0]) {
        personality_score+='S'
    } else {
        personality_score+='N'
    }

    if (categories[9] + categories[1] + categories[2] >= categories[11] + categories[0] + categories[20] ) {
        personality_score+='T'
    } else {
        personality_score+='F'
    }

    if (categories[18] + categories[7] + categories[8] >= categories[2] + categories[0] + categories[10]) {
        personality_score+='J'
    } else {
        personality_score+='P'
    }
    
    return personality_score;
  }``

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
          <h2 className = 'subtitle'> {strings[`${personality(props.googlePhotoContentCategories)}_sum`] }</h2>
      </section>
    
      <section className = 'section'>
          <h1 className = 'title'> Your place in the universe</h1>
          <h2 className = 'subtitle'> {strings.Leo_sum} </h2>
      </section>

      <section className = 'section'>
          <h1 className = 'title'> Common themes of your life</h1>
          <h2 className = 'subtitle'> {strings.PastGenerate(props.mostCommonLabels[0], props.mostCommonLabels[1])[Math.floor(Math.random()*4)]} </h2>
      </section>

      <section className = 'section'>
          <h1 className = 'title'> Your past and present</h1>
          <h2 className = 'subtitle'>{strings.TopGenerate(props.mostCommonLabels[2], props.mostCommonLabels[3])[Math.floor(Math.random()*4)]} </h2>
      </section>

    </div>
  );
}
