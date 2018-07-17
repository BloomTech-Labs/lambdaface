import React from 'react';

import UserBar from './UserBar';

export default props => (
  <div className="reply__container">
    {props.replyInfo.content}
    { props.currentUser === props.replyInfo.userId 
      ? (<div>
          <button onClick={props.editReply} >edit</button>
          <button onClick={props.deleteReply} >delete</button>
        </div>)
      : ''
    }
    <UserBar
      currentUser={props.currentUser}
      type="comment"
      info={props.replyInfo}
      toggleReply={props.toggleReplyingTo}
      hasUserVoted={props.replyInfo.hasUserVoted}
    />
  </div>
);
