import React from "react";
import "./Results.css";
import logo from "../img/Logo.svg";

export default function Results() {
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
          <h2 className = 'subtitle'> </h2>
      </section>
    
      <section className = 'section'>
          <h1 className = 'title'> Your place in the universe</h1>
          <h2 className = 'subtitle'> </h2>
      </section>

      <section className = 'section'>
          <h1 className = 'title'> Common themes of your life</h1>
          <h2 className = 'subtitle'> </h2>
      </section>

      <section className = 'section'>
          <h1 className = 'title'> Your past and present</h1>
          <h2 className = 'subtitle'> </h2>
      </section>
      
    </div>
  );
}
