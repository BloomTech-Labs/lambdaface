import React from "react";
import Button from "@material-ui/core/Button";
import HomePage from "./Components/HomePage";

import lambda from './Assets/lambda.svg';


export default props => {
  const { isAuthenticated } = props.auth;
  const login = event => {
    event.preventDefault();
    props.auth.login();
  };

  const logout = event => {
    event.preventDefault();
    props.auth.logout();
  };
  return (
    <div className="landing-page__container">
      { isAuthenticated()
        ? <HomePage logout={logout} />
        : (
          <div className="landing-page__no-login">
            <div className="landing-page__topbar">
              <img src={lambda} alt="LambdaLogo" className="landing-page__logo" />
            </div>
            <div className="landing-page__main">
              <h1>Hello!</h1>
              <h3>LambdaFace is a private community for Lambda School students.</h3>
              <Button className="landing-page__login-btn" variant="contained" color="primary" onClick={login}>
                Login or Register Here
              </Button>
            </div>
          </div>
        )
      }
    </div>
  );
}
