import React from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";

import upvote from "../../Assets/upvote.svg";
import downvote from "../../Assets/downvote.svg";

import "../../Styles/UserBar.css";

const UserBar = props => {
  let user
  if (props.info.user) {
    user = props.info.user.firstName.concat(` ${props.info.user.lastName}`);
  } else {
    user = "Foobar Barfoo";
  }
  const vote = (voteType) => event => {
    const voteBody = {
      userId: props.currentUser,
      parentId: props.info.id,
      voteType: voteType
    }
    event.stopPropagation();
    axios
      .post('http://localhost:5000/api/votes', voteBody)
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
          <img src={upvote} onClick={vote('INC')} alt="Upvotes" height="13px" width="11px" />
          <img src={downvote} onClick={vote('DEC')} alt="Downvotes" height="13px" width="11px" />
          <div>{props.info.downvotes}</div>
          <div>{props.info.commentCount} Comments</div>
          <Button>Follow thread</Button>
        </div>
      )}
      {props.type === "comment" && (
        <div className="toolbar">
          <Button onClick={props.toggleReply}>Reply</Button>
          <div>{props.info.upvotes}</div>
          <img src={upvote} onClick={vote('INC')} alt="Upvotes" height="13px" width="11px" />
          <img src={downvote} onClick={vote('DEC')} alt="Downvotes" height="13px" width="11px" />
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
