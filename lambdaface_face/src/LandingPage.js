import React from "react";
import Button from "@material-ui/core/Button";
import HomePage from "./Components/HomePage";

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
            <div>
              <h1>Welcome to LambdaFace</h1>
              <h3>Please Login or Register</h3>
              <Button className="landing-page__login-btn" variant="contained" color="primary" onClick={this.login()}>
                Login
              </Button>
            </div>
          )}
          {isAuthenticated() && (
            <div>
              <span>User is now logged in.</span>
              <Button className="landing-page__logout-btn" variant="contained" color="primary" onClick={this.logout()}>
                Logout
              </Button>
              <HomePage />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default LandingPage;
