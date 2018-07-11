import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const LeftNav = props => {
  return (
    <List component="nav" className="category-list">
      {props.options.map((category, i) => {
        const image = require(`../Assets/${category}.svg`);
        return (
          <ListItem
            className="category-item"
            button
            key={Math.random()}
            onClick={props.changeCurrentCategory([category, i])}
          >
            <img src={image} alt={category} />
            <ListItemText primary={category} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default LeftNav;
