import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";

export default props => {
  return (
    props.category && (
      <div>
        <div>
          <h1>{props.category}</h1>
          <Button onClick={props.changeCurrentCategory("AddPost")}>
            Add Post
          </Button>
        </div>
        <List>
          {props.postsArr.map((post, i) => {
            return (
              <ListItem
                key={Math.random()}
                onClick={props.changeCurrentCategory("PostPage", post)}
              >
                <ListItemText primary={post.title} />
              </ListItem>
            );
          })}
        </List>
      </div>
    )
  );
};
