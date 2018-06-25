import React from "react";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import Uploader from "./Uploader";
import PasswordReset from "./PasswordReset";

import backArrow from "../Assets/BackArrow.svg";
import "../Styles/UserSettings.css";


class UserSettings extends React.Component {
  state = {
    userId: this.props.userInfo.sub,
    profilePicture: this.props.userInfo.picture,
    firstName: "",
    lastName: "",
    email: this.props.userInfo.name,
    passwordResetEmail: this.props.userInfo.name,
    passwordReset: false,
    selectedImage: null,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  resetPassword = () => {
    const userStuff = {
      client_id: 'A86C7iFueySjvHsu5fhxq3SVJBNxo1CF',
      email: this.state.passwordResetEmail,
      connection: 'Username-Password-Authentication'}

    axios.post('https://lambda-face-test1.auth0.com/dbconnections/change_password', userStuff)
      .then((res) => {
        this.setState({ passwordReset: true });
        console.log({ success: res });
      })
      .catch((err) => {
        console.error({ err });
      })
  }

  updateInfo = () => event => {
    event.preventDefault();
    const userInfo = { ...this.state };
    const userId = userInfo.userId;
    // console.log("updating Info!", userInfo);
    axios
      .put(`${process.env.REACT_APP_URL}api/users/${userId}`, userInfo)
      .then(res => {
        console.log(res);
        // need to know what res looks like
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const imageSize = {
      width: '150px',
      height: '150px',
    };
    return (
      <div>
        <IconButton onClick={this.props.changeCurrentCategory(this.props.category)}>
          <img src={backArrow} alt="Back" height="30px" width="30px" />
        </IconButton>
        <div className="user-settings__container">
          {" "}
          {/*left column*/}
          <div className="user-settings__left-col">
            <img src={this.state.profilePicture} alt="profilepicture" style={imageSize} />
            <span>(change)</span>
          </div>
<<<<<<< HEAD

          <Uploader />
          <span>(change)</span>
        </div>
        <form className="user-settings__mid-col" onSubmit={this.updateInfo()}>
          {" "}
          {/*middle column*/}
          <TextField
            id="firstName-input"
            label="First Name"
=======
          <form className="user-settings__mid-col" onSubmit={this.updateInfo()}>
            {" "}
            {/*middle column*/}
            <TextField
              id="firstName-input"
              label="First Name"
>>>>>>> c2d4a2c01f3b363c100ed5393c1578343c9ffb3c
            // className={}
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange("firstName")}
              margin="normal"
              required
            />
            <TextField
              id="lastName-input"
              label="Last Name"
            // className={}
              type="text"
              value={this.state.lastName}
              onChange={this.handleChange("lastName")}
              margin="normal"
              required
            />
            <TextField
              id="email-input"
              label="Email Address"
            // className={}
              type="email"
              value={this.state.email}
              onChange={this.handleChange("email")}
              margin="normal"
              required
            />
            {/* <TextField
            id="password-input"
            label="Password"
            // className={}
            type="password"
            value={this.state.password}
            onChange={this.handleChange("password")}
            margin="normal"
          /> */}
            <Button variant="contained" onClick={this.resetPassword}>
            Reset Password
            </Button>
            <Button variant="contained" type="submit">
            Save Settings
            </Button>
          </form>
          <div className="user-settings__right-col">
            {/*right column*/}
            {/* <div>...</div> */}
          </div>
          <div className="user-settings__passwordReset">
            {this.state.passwordReset ? <PasswordReset /> : null }
          </div>
        </div>
      </div>
    );
  }
}

export default UserSettings;
