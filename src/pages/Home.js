import React from "react";
import { useState } from "react";
import GooglePhotoLoginButton from "../components/GooglePhotoLoginButton";
import Logo from "../img/Logo.svg";
import "./Home.css";

export default function Home(props) {
  return (
    <section className="hero is-large has-text-centered">
      <img src={Logo} alt="logo" className="image is-centered" id="Logo" />
      <p className="subtitle" id="subtitle">
       A glimpse into your photo album gives a glimpse into you
      </p>
      <div className="container has-text-centered">
        <GooglePhotoLoginButton
          handleLogin={props.handleLogin}
          fetchPhotos={props.fetchPhotos}
        />
      </div>
    </section>
  );
}
