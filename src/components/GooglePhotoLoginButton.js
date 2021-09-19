import React from "react";
import { GoogleLogin } from "react-google-login";

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
        clientId="537823722219-1mq1dl0uje8qd9j89kgspe08t1vicks4.apps.googleusercontent.com"
        buttonText="Sync Google Photos"
        onSuccess={googlePhotosSuccess}
        onFailure={googlePhotosFailure}
        scope="https://www.googleapis.com/auth/photoslibrary"
        cookiePolicy="single_host_origin"
      />
    </div>
  );
}
