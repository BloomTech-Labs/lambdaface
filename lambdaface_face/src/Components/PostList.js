import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import UserBar from "./PostPage/UserBar";
import "../Styles/PostList.css";

export default props => {
  return (
    props.category && (
      <div>
        <div>
          <h1>{props.category[0]}</h1>
          <Button onClick={props.changeCurrentCategory(["AddPost", null])}>
            Add Post
          </Button>
        </div>
        <List>
          {props.postsArr.map((post, i) => {
            return (
              <ListItem
                className="postList__listItem"
                style={{ alignItems: "flex-start" }}
                key={post.id}
                onClick={props.changeCurrentCategory(["PostPage", null], post)}
              >
<<<<<<< HEAD
                <ListItemText className="listItem__top" primary={post.title} />
                <UserBar className="listItem__bottom" info={post} currentUser={props.currentUser.sub} type="allposts" />
=======
                <ListItemText className="listItem__top" primary={post.content.slice(0, 40)} />
                <UserBar className="listItem__bottom" info={post} type="allposts" />
>>>>>>> c2d4a2c01f3b363c100ed5393c1578343c9ffb3c
              </ListItem>
            );
          })}
        </List>
      </div>
    )
  );
};
