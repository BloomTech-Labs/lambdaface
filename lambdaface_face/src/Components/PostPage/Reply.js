import React from 'react';

import UserBar from './UserBar';

export default props => (
  <div className="reply__container">
    {props.replyInfo.content}
    <UserBar
      currentUser={props.currentUser}
      type="comment"
      info={props.replyInfo}
      toggleReply={props.toggleReplyingTo}
    />
  </div>
);
