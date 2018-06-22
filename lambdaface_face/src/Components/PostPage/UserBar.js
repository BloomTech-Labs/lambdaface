import React from "react";

import Button from "@material-ui/core/Button";

import upvote from "../../Assets/upvote.svg";
import downvote from "../../Assets/downvote.svg";

import "../../Styles/UserBar.css";

const UserBar = props => {
  // console.log(props);
  let user
  if (props.info.user) {
    user = props.info.user.firstName.concat(` ${props.info.user.lastName}`);
  } else {
    user = props.info.nickname;
  }
  return (
    <div className="toolbar">
      <div />
      <span>{user}</span>
      {props.type === "allposts" && (
        <div className="toolbar">
          {/* TODO: make this dynamic */}
          <img src={upvote} alt="Upvotes" height="13px" width="11px" />
          <div>{props.info.upvotes}</div>
          <img src={downvote} alt="Downvotes" height="13px" width="11px" />
          <div>{props.info.downvotes}</div>
          <div>Category</div>
          <div>date</div>
          <div>views</div>
          <div>Comments</div>
        </div>
      )}
      {props.type === "singlepost" && (
        <div className="toolbar">
          <div>{props.info.upvotes}</div>
          <img src={upvote} alt="Upvotes" height="13px" width="11px" />
          <img src={downvote} alt="Downvotes" height="13px" width="11px" />
          <div>{props.info.downvotes}</div>
          <div>{props.info.commentCount} Comments</div>
          <Button>Follow thread</Button>
        </div>
      )}
      {props.type === "comment" && (
        <div className="toolbar">
          <Button onClick={props.toggleReply}>Reply</Button>
          <div>{props.info.upvotes}</div>
          <img src={upvote} alt="Upvotes" height="13px" width="11px" />
          <img src={downvote} alt="Downvotes" height="13px" width="11px" />
          <div>{props.info.downvotes}</div>
        </div>
      )}
      {props.type === "writecomment" && (
        <div className="toolbar">
          <Button onClick={props.submitComment()}>Post Comment</Button>
        </div>
      )}
      {props.type === "writereply" && (
        <div className="toolbar">
          <Button onClick={props.submitReply()}>Post Reply</Button>
        </div>
      )}
    </div>
  );
};

export default UserBar;
