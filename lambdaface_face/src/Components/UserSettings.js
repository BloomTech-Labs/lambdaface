import React from "react";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import backArrow from "../Assets/BackArrow.svg";
import "../Styles/UserSettings.css";


class UserSettings extends React.Component {
  state = {
    userId: this.props.userInfo.sub,
    profilePicture: this.props.userInfo.picture,
    firstName: "",
    lastName: "",
    email: this.props.userInfo.name,
    password: "",
    selectedImage: null,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

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
            <img src={this.state.profilePicture} alt="profilepicture" style={imageSize} className="left-col__picture" />
            <span>(change)</span>
          </div>
          <form className="user-settings__mid-col" onSubmit={this.updateInfo()}>
            {" "}
            {/*middle column*/}
            <TextField
              id="firstname-input"
              label="First Name"
            // className={}
              type="text"
              value={this.state.firstname}
              onChange={this.handleChange("firstName")}
              margin="normal"
            />
            <TextField
              id="lastname-input"
              label="Last Name"
            // className={}
              type="text"
              value={this.state.lastname}
              onChange={this.handleChange("lastName")}
              margin="normal"
            />
            <TextField
              id="email-input"
              label="Email Address"
            // className={}
              type="email"
              value={this.state.email}
              onChange={this.handleChange("email")}
              margin="normal"
            />
            <TextField
              id="password-input"
              label="Password"
            // className={}
              type="password"
              value={this.state.password}
              onChange={this.handleChange("password")}
              margin="normal"
            />
            <Button variant="contained" type="submit">
            Save Settings
            </Button>
          </form>
          <div className="user-settings__right-col">
            {/*right column*/}
            <div>...</div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserSettings;
