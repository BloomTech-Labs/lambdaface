import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LandingPageForms extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    signup: false,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  login = () => event => {
    event.preventDefault();
    const currentUser = { username: this.state.username, password: this.state.password };
    console.log("logging in as ", currentUser);
    axios
      .post('urlgoeshere', currentUser)
      .then(res => {
        // need to know what res looks like
      })
      .catch(err => {
        console.error(err);
      });
  };

  signup = () => event => {
    event.preventDefault();
    const newUser = { username: this.state.username,  email: this.state.email, password: this.state.password };
    console.log("signing up as ", newUser);
    if (this.state.confirmpassword !== newUser.password) {
      console.error('passwords do not match');
      return;
    }
    axios
      .post('signupurlhere', newUser)
      .then(res => {
        // need to know what res looks like
      })
      .catch(err => {
        console.error(err);
      });
  };

  setSignup = bool => event => {
    event.preventDefault();
    this.setState({
      signup: bool,
    });
  };

  render() {
    console.log("rendering!");
    if (this.state.signup) {
      return (
        <form onSubmit={this.signup()}>
          <TextField
            id="username-input"
            label="Username"
            // className={}
            type="text"
            value={this.state.username}
            onChange={this.handleChange('username')}
            margin="normal"
          />
          <TextField
            id="email-input"
            label="Email Address"
            // className={}
            type="email"
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="normal"
          />
          <TextField
            id="password-input"
            label="Password"
            // className={}
            type="password"
            value={this.state.password}
            onChange={this.handleChange('password')}
            margin="normal"
          />
          <TextField
            id="confirm-password-input"
            label="Confirm Password"
            // className={}
            type="password"
            value={this.state.confirmpassword}
            onChange={this.handleChange('confirmpassword')}
            margin="normal"
          />
          <Button variant="contained" type="submit">
            Sign Up
          </Button>
          <Button variant="contained" color="secondary" onClick={this.setSignup(false)}>
            Cancel
          </Button>
        </form>
      );
    }
    return (
      <form onSubmit={this.login()}>
        <TextField
          id="username-input"
          label="Username"
          // className={}
          type="text"
          value={this.state.username}
          onChange={this.handleChange('username')}
          margin="normal"
        />
        <TextField
          id="password-input"
          label="Password"
          // className={}
          type="password"
          value={this.state.password}
          onChange={this.handleChange('password')}
          margin="normal"
        />
        <Button variant="contained" type="submit">
          Login
        </Button>
        <Button variant="contained" onClick={this.setSignup(true)}>
          Sign Up
        </Button>
      </form>
    );
  };
};

export default LandingPageForms;