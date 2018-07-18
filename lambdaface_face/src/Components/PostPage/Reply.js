import React from 'react';

import UserBar from './UserBar';
import UserMenu from './UserMenu'

export default props => (
  <div className="reply__container">
    {props.replyInfo.content}
    { props.currentUser === props.replyInfo.userId 
      ? <UserMenu handleEdit={props.editReply} handleDelete={props.deleteReply} />
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
