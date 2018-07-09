import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";

import UserBar from "./PostPage/UserBar";
import FilterMenu from "./FilterMenu";
// import "../Styles/PostList.css";

const className = (i) => {
  if (i % 2 !== 0) {
    return "postList__listItem-odd"
  } else
    return "postList__listItem-even"
}

export default props => {
  let category = props.category[0];
  // if (category.length > 2) {
  //   category = category.replace(/([A-Z])/g, ' $1').trim();
  // }
  return (
    props.category && (
      <div className="postList__container">
        <div className="postList__header">
          <h1 className="postList__header-category">{category}</h1>
          <FilterMenu className="postList__header-filter" handleNewest={props.handleNewest} />
          <Button className="postList__header-addPost" variant="contained" color="primary" onClick={props.changeCurrentCategory(["AddPost", null])}>
            Add Post
          </Button>
        </div>
        <List>
          {props.postsArr.map((post, i) => {
            let postPreview = post.content.slice(0, 140);
            if (post.content.length > 140) {
              postPreview = postPreview + '...'
            }
            return (
              <ListItem
                className={className(i)}
                style={{ alignItems: "flex-start"}}
                key={post.id}
                onClick={props.changeCurrentCategory(["PostPage", null], post)}
              >
                <ListItemText className="listItem__top" primary={postPreview} />
                {/* <ListItemText className="listItem__top" primary={post.content.slice(0, 40)} /> */}
                <UserBar className="listItem__bottom" info={post} type="allposts" />
              </ListItem>
            );
          })}
        </List>
      </div>
    )
  );
};
