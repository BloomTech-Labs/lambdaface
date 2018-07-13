import React from "react";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import PasswordReset from "./PasswordReset";
import Uploader from "./Uploader";

import backArrow from "../Assets/BackArrow.svg";
// import "../Styles/css/index.css";


class UserSettings extends React.Component {
  state = {
    userId: this.props.userInfo.sub,
    profilePicture: this.props.userInfo.profilePicture,
    firstName: "",
    lastName: "",
    email: this.props.userInfo.name,
    passwordResetEmail: this.props.userInfo.name,
    passwordReset: false,
    selectedImage: null,
    settingsSaved: false,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  closePasswordModal = () => {
    this.setState({
      passwordReset: false
    })
  }

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
        this.props.updateUser(this.state);
        this.setState({ settingsSaved: true });
        setTimeout(() => {
          this.setState({ settingsSaved: false });
        }, 2500);
        console.log(res);
        // need to know what res looks like
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <div>
        <IconButton onClick={this.props.changeCurrentCategory(this.props.category)}>
          <img src={backArrow} alt="Back" height="30px" width="30px" />
        </IconButton>
        <div className="user-settings__container">
          {" "}
          {/*left column*/}
          <div className="user-settings__left-col">
            <Uploader userId={this.state.userId} profilePicture={this.state.profilePicture} imageHash={this.props.imageHash} updateImageHash={this.props.updateImageHash} updatePic={this.props.updatePic} />
          </div>
          <form className="user-settings__mid-col" onSubmit={this.updateInfo()}>
            {" "}
            {/*middle column*/}
            <TextField
              id="firstName-input"
              className="user-settings__text-field"
              label="First Name"
            // className={}
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange("firstName")}
              margin="normal"
              required
            />
            <TextField
              id="lastName-input"
              className="user-settings__text-field"
              label="Last Name"
          // className={}
              type="text"
              value={this.state.lastName}
              onChange={this.handleChange("lastName")}
              margin="normal"
              required
            />
            {/* <TextField
              id="email-input"
              className="user-settings__text-field"
              label="Email Address"
            // className={}
              type="email"
              value={this.state.email}
              onChange={this.handleChange("email")}
              margin="normal"
              required
            /> */}
            {/* <TextField
              id="password-input"
              label="Password"
              // className={}
              type="password"
              value={this.state.password}
              onChange={this.handleChange("password")}
              margin="normal"
            /> */}
            <div className="user-settings__btns">
              <Button className="user-settings__reset-btn" variant="contained" color="primary" size="medium" onClick={this.resetPassword}>
              Reset Password
              </Button>
              <Button className="user-settings__save-btn" variant="contained" color="primary" size="medium" type="submit">
              Save Settings
              </Button>
              <Button className="user-settings__logout-btn" variant="contained" color="primary" onClick={this.props.logout}>
                  Logout
              </Button>
            </div>
          </form>
          <div className="user-settings__right-col">
            {/*right column*/}
            {/* <div>...</div> */}
            {this.state.passwordReset ? <PasswordReset handlePW={this.closePasswordModal} /> : null}
          </div>
        </div>
        <div className="user-settings__settingsSaved">
          {this.state.settingsSaved ? <div>Settings Saved!</div> : null}
        </div>
      </div>
    );
  }
}

export default UserSettings;
