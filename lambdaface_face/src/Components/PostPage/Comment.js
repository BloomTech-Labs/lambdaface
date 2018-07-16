import React from "react";
import axios from 'axios';

import UserBar from "./UserBar";
import WriteReply from "./WriteReply";
import Reply from "./Reply";

class Comment extends React.Component {
  state = {
    replyingTo: false
  };

  toggleReplyingTo = () => {
    this.setState(prev => ({ replyingTo: !prev.replyingTo }));
  };

  deleteComment = () => {
    const { id } = this.props.comment;
    const userId = this.props.userInfo.sub;

    axios
      .put(`${process.env.REACT_APP_URL}api/comments/delete/${id}`, { userId })
      .then(() => {
        console.log('comment deleted');
      })
      .catch(error => console.error(error));
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
          ? <button onClick={this.deleteComment}>delete</button>
          : ''
        }
        {comment.comments.map(comment => (
          <Reply 
            key={comment.id}
            replyInfo={comment}
            toggleReplyingTo={this.toggleReplyingTo}
            currentUser={userInfo.sub}
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

export default Comment;
