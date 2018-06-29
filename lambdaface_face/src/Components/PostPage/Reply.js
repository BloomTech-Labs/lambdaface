import React from 'react';

import UserBar from './UserBar';
// import "../../Styles/Reply.css";

const Reply = props => {
  return (
    <div className="reply__container">
      <div>{props.replyInfo.content}</div>
      <UserBar
        currentUser={props.currentUser}
        type="comment"
        info={props.replyInfo}
        toggleReply={props.toggleReplyingTo}
      />
    </div>
  );
};

export default Reply;
