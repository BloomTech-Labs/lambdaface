import React from "react";

import UserBar from "./UserBar";

const PostFull = props => {
  return (
    <div>
      <div>{props.post.content}</div>
      <UserBar type="singlepost" info={props.post} />
    </div>
  );
};

export default PostFull;
