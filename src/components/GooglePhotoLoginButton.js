import React from "react";
import { GoogleLogin } from "react-google-login";
import env from 'react-dotenv'

export default function GooglePhotoLoginButton(props) {


  const googlePhotosSuccess = (res) => {
    props.handleLogin(res?.profileObj.name, res?.tokenObj.access_token);
  }

  const googlePhotosFailure = (err) => {
    console.error(err);
  }

  return (
    <div>
      <GoogleLogin
        clientId={`${env.OAUTH_CLIENT_ID}`}
        buttonText="Sync Google Photos"
        onSuccess={googlePhotosSuccess}
        onFailure={googlePhotosFailure}
        scope="https://www.googleapis.com/auth/photoslibrary"
        cookiePolicy="single_host_origin"
      />
    </div>
  );
}
