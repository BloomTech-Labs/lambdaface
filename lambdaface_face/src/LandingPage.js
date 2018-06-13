import React from 'react';
import Button from '@material-ui/core/Button';

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
    console.log(localStorage);
    return (
      <div>
        {
          !isAuthenticated() &&
          <Button variant="contained" color="primary" onClick={this.login()}>
            Login
          </Button>
        }
        {
          isAuthenticated() &&
          <div>
          <span>User is now logged in.</span>
          <Button variant="contained" color="primary" onClick={this.logout()}>
           Logout
          </Button>
          </div>
        }
      </div>
    );
  };
};

export default LandingPage;