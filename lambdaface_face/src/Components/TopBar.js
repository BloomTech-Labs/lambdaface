import React from "react";
import Button from "@material-ui/core/Button";
import LambdaLogo from "../Assets/LambdaLogo.svg";

import Notifications from "./TopBar/Notifications";
import Search from "./TopBar/Search";

export default props => {
  const { profilePicture } = props.userInfo;
  return (
    <div className="top-bar__container">
      {profilePicture && (
      <div className="top-bar">
        <img src={LambdaLogo} alt="logo" className="top-bar__logo" />
        <Search 
          className="top-bar__search" 
          onSubmit={props.changeCurrentCategory}
        />
        <Notifications 
          notifications={props.notifications} 
          clearNotifications={props.clearNotifications} 
          changeCurrentCategory={props.changeCurrentCategory}
        />
        <div className="top-bar__user-button">
          <Button onClick={props.changeCurrentCategory(["User Settings", null])}>
            <img 
              src={`${profilePicture}?${props.imageHash}`}
              alt="profile"
              className="top-bar__user-image"
            />
          </Button>
        </div>
      </div>
      )}
    </div>
  );
};
