import React from "react";
import { GoogleLogin } from "react-google-login";
import { useState } from "react";
import { useGoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

export default function Home() {
  const [user, setUser] = useState(null);
  const [userPhotos, setUserPhotos] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const googleSuccess = async (res) => {
    console.log(res);
    setAccessToken(res?.tokenObj.access_token);
    setUser(res?.profileObj.name);
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("login failed");
  };

  const getPhotos = async () => {
    const response = await fetch(
      "https://photoslibrary.googleapis.com/v1/mediaItems",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const photoData = await response.json();

    const photoUrls = photoData.mediaItems.map((item) => item.baseUrl);

    setUserPhotos(photoUrls);

    console.log(photoData);
  };

  const analyzeImages = async () => {

    const response = await fetch(
      " https://vision.googleapis.com/v1/images:annotate",
      {
        requests: [
          {
            features: [
              {
                type: "WEB_DETECTION",
              },
            ],
            image: {
              source: {
                imageUri:
                  "https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg",
              },
            },
          },
        ],
      }
    );

    console.log(response);


  };

  return (
    <div>
      <h1> Pythia</h1>
      <GoogleLogin
        clientId="537823722219-1mq1dl0uje8qd9j89kgspe08t1vicks4.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        scope="https://www.googleapis.com/auth/photoslibrary"
        cookiePolicy="single_host_origin"
      />
      {user}

      <button onClick={getPhotos}>Photos</button>

      <button onClick={analyzeImages}>Analyze Photos </button>

      {userPhotos
        ? userPhotos.map((photoUrls) => <img src={photoUrls} />)
        : null}
      {accessToken}
    </div>
  );
}
