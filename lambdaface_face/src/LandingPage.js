import React from "react";
import Button from "@material-ui/core/Button";
import HomePage from "./Components/HomePage";

import lambda from './Assets/lambda.svg';

class LandingPage extends React.Component {
  login = () => event => {
    event.preventDefault();
    this.props.auth.login();
  };

  logout = () => event => {
    event.preventDefault();
    this.props.auth.logout();
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="landing-page__container">
        <div className="landing-page__no-login">
          {!isAuthenticated() && (
            <div className="landing-page__no-login">
              <div className="landing-page__topbar">
                <img src={lambda} alt="LambdaLogo" className="landing-page__logo" />
              </div>
              <div className="landing-page__main">
                <h1>Hello!</h1>
                <h3>LambdaFace is a private community for Lambda School students.</h3>
                <Button className="landing-page__login-btn" variant="contained" color="primary" onClick={this.login()}>
                Login or Register Here
                </Button>
              </div>
            </div>
          )}
          {isAuthenticated() && (
            <div>
              {/* <span>User is now logged in.</span> */}
              {/* <Button className="landing-page__logout-btn" variant="contained" color="primary" onClick={this.logout()}>
                Logout
              </Button> */}
              <HomePage logout={this.logout} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default LandingPage;
