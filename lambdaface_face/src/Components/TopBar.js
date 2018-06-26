import React from "react";
import Button from "@material-ui/core/Button";
import LambdaLogo from "../Assets/LambdaLogo.svg";

import Search from "./Search";

const imageSize = {
  width: '50px',
  height: '50px',
};

export default props => {
  const profilePic = 'https://i.stack.imgur.com/34AD2.jpg';
  return (
    <div>
      <img src={LambdaLogo} alt="logo" />
      <Button onClick={props.changeCurrentCategory(["User Settings", null])}>
        <img src={profilePic} alt="profile" style={imageSize} />
      </Button>
      <Search onSubmit={props.changeCurrentCategory} />
    </div>
  );
};
