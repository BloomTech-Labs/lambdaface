import React from 'react';
import Button from '@material-ui/core/Button';
import App from './App';

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
          <App />
          </div>
        }
      </div>
    );
  };
};

export default LandingPage;