import React from "react";

import Button from "@material-ui/core/Button";
import LambdaLogo from "../Assets/LambdaLogo.svg";

export default props => {
  return (
    <div>
      <img src={LambdaLogo} alt="logo" />
      <Button onClick={props.changeCurrentCategory("User Settings")}>
        User Settings
      </Button>
    </div>
  );
};
