import React from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";

import upvote from "../../Assets/upvote.svg";
import downvote from "../../Assets/downvote.svg";

// import "../../Styles/UserBar.css";

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
  let user;
  let currentUser = props.currentUser;
  if (props.info.firstName) {
    user = props.info.firstName.concat(` ${props.info.lastName}`);
  } else {
    user = props.info.nickname;
  }
  const vote = (voteType, parentType) => event => {
    const voteBody = {
      userId: currentUser,
      parentId: props.info.id,
      voteType: voteType,
      parentType: parentType
    }
    event.stopPropagation();
    axios
      .post(`${process.env.REACT_APP_URL}`.concat('api/votes'), voteBody)
      .then((res) => {
        if (voteType === "INC") {
          console.log("Upboated!");
        } else {
          console.log("Downboated!");
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }
  return (
    <div className="user-bar__container">
      <div />
      <span>{user}</span>
      {props.type === "allposts" && (
        <div className="user-bar__info">
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
        <div className="user-bar__info">
          <div>{props.info.upvotes}</div>
          <img src={upvote} onClick={vote('INC', 'post')} alt="Upvotes" height="13px" width="11px" />
          <img src={downvote} onClick={vote('DEC', 'post')} alt="Downvotes" height="13px" width="11px" />
          <div>{props.info.downvotes}</div>
          <div>{props.info.commentCount} Comments</div>
          <Button variant="contained" color="primary">Follow thread</Button>
        </div>
      )}
      {props.type === "comment" && (
        <div className="user-bar__info">
          <Button onClick={props.toggleReply}>Reply</Button>
          <div>{props.info.upvotes}</div>
          <img src={upvote} onClick={vote('INC', 'comment')} alt="Upvotes" height="13px" width="11px" />
          <img src={downvote} onClick={vote('DEC', 'comment')} alt="Downvotes" height="13px" width="11px" />
          <div>{props.info.downvotes}</div>
        </div>
      )}
      {props.type === "writecomment" && (
        <div className="user-bar__info">
          <Button onClick={props.submitComment()}>Post Comment</Button>
        </div>
      )}
      {props.type === "writereply" && (
        <div className="user-bar__info">
          <Button onClick={props.submitReply()}>Post Reply</Button>
        </div>
      )}
    </div>
  );
};

export default UserBar;
