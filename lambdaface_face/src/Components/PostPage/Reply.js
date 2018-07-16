import React from 'react';
import axios from 'axios';

import UserBar from './UserBar';

const _deleteReply = (id, userId) => {
  axios
    .put(`${process.env.REACT_APP_URL}api/comments/delete/child/${id}`, { userId })
    .then(() => {
      console.log('comment deleted');
    })
    .catch(error => console.error(error));
}

export default props => (
  <div className="reply__container">
    {props.replyInfo.content}
    { props.currentUser === props.replyInfo.userId 
      ? (<div>
          {/* <button onClick={} >edit</button> */}
          <button onClick={() => _deleteReply(props.replyInfo.id, props.currentUser)} >delete</button>
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
