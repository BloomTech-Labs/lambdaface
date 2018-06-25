import React from "react";

import Button from "@material-ui/core/Button";

import upvote from "../../Assets/upvote.svg";
import downvote from "../../Assets/downvote.svg";

import "../../Styles/UserBar.css";

const categories = [
  "All Posts",
  "Announcements",
  "Dev Team",
  "Design Team",
  "Marketing",
  "HR",
  "Product Managers",
  "QA"
];

const convertTime = time => {
  const splitTime = time.split(/[- 'T']/);
  // console.log(splitTime);

  // const date = new Date(Date.UTC(splitTime[0], splitTime[1]-1, splitTime[2], splitTime[3], splitTime[4], splitTime[5]));

  // return date.toDateString().slice(4);
  return `${splitTime[1]}-${splitTime[2]}-${splitTime[0]}`;
};

const UserBar = props => {
  // console.log(props);
  let user
  if (props.info.firstName) {
    user = props.info.firstName.concat(` ${props.info.lastName}`);
  } else {
    user = props.info.nickname;
  }
  return (
    <div className="userbar">
      <div />
      <span>{user}</span>
      {props.type === "allposts" && (
        <div className="toolbar">
          {/* TODO: make this dynamic */}
          <img src={upvote} alt="Upvotes" height="13px" width="11px" />
          <div>{props.info.upvotes}</div>
          <img src={downvote} alt="Downvotes" height="13px" width="11px" />
          <div>{props.info.downvotes}</div>
          <div>{categories[props.info.categoryId]}</div>
          <div>{convertTime(props.info.createdAt)}</div>
          <div>{props.info.viewCount} Views</div>
          <div>{props.info.commentCount} Comments</div>
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
