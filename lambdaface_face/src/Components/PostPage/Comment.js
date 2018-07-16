import React from "react";
import axios from 'axios';

import UserBar from "./UserBar";
import WriteReply from "./WriteReply";
import Reply from "./Reply";

export default class Comment extends React.Component {
  state = {
    replyingTo: false,
  };

  toggleReplyingTo = () => {
    this.setState(prev => ({ replyingTo: !prev.replyingTo }));
  };

  deleteComment = async (id, userId, isChild) => {
    await axios
      .put(`${process.env.REACT_APP_URL}api/comments/delete/${isChild ? 'child/' : ''}${id}`, { userId })
      .then(() => {
        console.log('comment deleted');
      })
      .catch(error => console.error(error));
    
    this.props.reloadComments(true);
  }

  render() {
    const { replyingTo } = this.state;
    const { comment, userInfo } = this.props;
    // console.log(this.props.comment);
    return (
      <div className="comment__container">
        <div className="comment__content">{comment.content}</div>
        <UserBar
          currentUser={userInfo.sub}
          type="comment"
          info={comment}
          toggleReply={this.toggleReplyingTo}
          imageHash={this.props.imageHash}
          hasUserVoted={comment.hasUserVoted}
        />
        { userInfo.sub === comment.userId
          ? <button onClick={() => this.deleteComment(comment.id, userInfo.sub, false)}>delete</button>
          : ''
        }
        {comment.replies.map(reply => (
          <Reply 
            key={reply.id}
            replyInfo={reply}
            toggleReplyingTo={this.toggleReplyingTo}
            currentUser={userInfo.sub}
            deleteReply={() => this.deleteComment(reply.id, userInfo.sub, true)}
          />
        ))}
        {replyingTo && 
          <WriteReply
            userInfo={userInfo}
            commentInfo={{
              parentId: comment.id, 
              parentType: 'comment', 
              parentFirstName: comment.firstName, 
              parentLastName: comment.lastName 
            }}
            reloadComments={this.props.reloadComments}
            toggleReplyingTo={this.toggleReplyingTo}
          />}
      </div>
    );
  }
}
