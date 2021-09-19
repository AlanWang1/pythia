import React from "react";
import { useState } from "react";
import GooglePhotoLoginButton from "../components/GooglePhotoLoginButton";

export default function Home(props) {

  return (
    <div>
      <h1> Pythia</h1>
      <GooglePhotoLoginButton 
        handleLogin = {props.handleLogin}       
        fetchPhotos = {props.fetchPhotos}
      />
    </div>
  );
}
