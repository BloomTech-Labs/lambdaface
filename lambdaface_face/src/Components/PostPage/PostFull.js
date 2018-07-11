import React from "react";

import UserBar from "./UserBar";

const PostFull = props => {
  return (
    <div>
      <div>{props.post.content}</div>
      <UserBar type="singlepost" info={props.post} currentUser={props.currentUser} following={props.following} />
    </div>
  );
};

export default PostFull;
