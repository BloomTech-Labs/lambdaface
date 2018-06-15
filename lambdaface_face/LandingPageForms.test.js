import React from "react";
import ReactDOM from "react-dom";
import LandingPageForms from "./LandingPageForms";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LandingPageForms />, div);
  ReactDOM.unmountComponentAtNode(div);
});
