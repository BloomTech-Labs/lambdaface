import React from "react";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import backArrow from "../Assets/BackArrow.svg";
import "../Styles/UserSettings.css";


class UserSettings extends React.Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  updateInfo = () => event => {
    event.preventDefault();
    const userInfo = { ...this.state };
    // console.log("updating Info!", userInfo);
    axios
      .put("urlgoeshere", userInfo)
      .then(res => {
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
          {/*container*/}
          <div className="user-settings__left-col">
            {" "}
            {/*left column*/}
            {/* <img className="left-col__picture" src="" alt=""/> */}
            <div className="left-col__picture" />
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
              onChange={this.handleChange("firstname")}
              margin="normal"
            />
            <TextField
              id="lastname-input"
              label="Last Name"
              // className={}
              type="text"
              value={this.state.lastname}
              onChange={this.handleChange("lastname")}
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
