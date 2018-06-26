import React from "react";
import Button from "@material-ui/core/Button";
import LambdaLogo from "../Assets/LambdaLogo.svg";

import Search from "./Search";

export default props => {
  const profilePic = 'https://i.stack.imgur.com/34AD2.jpg';
  return (
    <div className="top-bar">
      <img src={LambdaLogo} alt="logo" className="top-bar__logo" />
      <Search className="top-bar__search" onSubmit={props.changeCurrentCategory} />
      <div className="top-bar__user-button">
        <Button onClick={props.changeCurrentCategory(["User Settings", null])}>
          <img src={profilePic} alt="profile" className="top-bar__user-image" />
        </Button>
      </div>
    </div>
  );
};
