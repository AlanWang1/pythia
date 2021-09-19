import React from "react";
import "./Results.css";
import logo from "../img/Logo.svg";
import * as strings from '../constants/strings';

export default function Results(props) {

  const personality = (categories) => {

    let personality_score = '';

    if (categories[5] >= (props.dominantColor.length - categories[5])) {
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
  }

  const astrological = (categories) => {
    const element;
    const astro_sign;
    const fire_score = (categories[17] + categories[18] + categories[14]);
    const water_score = (categories[5] + categories[20] + categories[12]);
    const earth_score = (categories[19] + categories[0] + categories[11]);
    const air_score = (categories[16] + categories[10] + categories[13]);

    if(fire_score >= water_score && fire_score >= earth_score && fire_score >= air_score) {
        element = "fire";
    } else if(water_score >= earth_score && water_score >= air_score) {
        element = 'water';
    } else if(earth_score >= air_score) {
        element = 'earth'
    } else {
        element = 'air';
    }
    
    const color_arr = props.dominantColors;

    const freqArray = [];

        for (let i = 0; i < color_arr.length; i++){
          if (freqArray.length != 0){
            let found = false;
            for (let j = 0; j < freqArray.length; j++) {
              if (labels[i] === freqArray[j].name) {
                freqArray[j].count++
                found = true;
                break;
              }
            }
            if (!found) {
              freqArray.push({
                name:labels[i],
                count:1
              })
            }
          } else {
            freqArray.push({
              name: labels[i],
              count: 1
            })
          }
        }
    if (element == "fire") {

    } else if (element == "water") {

    } else if (element == "earth") {

    } else {

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
          <h2 className = 'subtitle'> {strings[`${personality(props.googlePhotoContentCategories)}_sum`] }</h2>
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
