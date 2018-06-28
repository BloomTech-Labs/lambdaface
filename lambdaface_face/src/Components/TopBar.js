import React from "react";
import Button from "@material-ui/core/Button";
import LambdaLogo from "../Assets/LambdaLogo.svg";
import notificationBell from '../Assets/notificationBell.svg';
import notificationCircle from '../Assets/notificationCircle.svg';

import Search from "./Search";

const NoticeMeSenpi = ({ numb }) => (
  <div className="top-bar__notifications__icon">
    <span>{numb}</span>
    <img src={notificationCircle}/>
  </div>
);

const Notifications = ({ notifications }) => {
  // notifications = ['test', 1, 2, 3];
  return (
    <div className="top-bar__notifications">
      { notifications
          ? <NoticeMeSenpi numb={notifications.length} />
          : ''
      } 
      <img
        className="top-bar__notifications__bell"
        src={notificationBell}
        alt="notifications icon"  
      />
    </div>
  );
};

export default props => {
  const profilePic = props.userInfo.profilePicture;
  return (
    <div className="top-bar">
      <img src={LambdaLogo} alt="logo" className="top-bar__logo" />
      <Search className="top-bar__search" onSubmit={props.changeCurrentCategory} />
      <Notifications />
      <div className="top-bar__user-button">
        <Button onClick={props.changeCurrentCategory(["User Settings", null])}>
          <img src={profilePic} alt="profile" className="top-bar__user-image" />
        </Button>
      </div>
    </div>
  );
};
