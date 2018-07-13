import React from "react";

import UserBar from "./UserBar";
import WriteReply from "./WriteReply";
import Reply from "./Reply";

class Comment extends React.Component {
  state = {
    replyingTo: false
  };

  toggleReplyingTo = () => {
    this.setState(({ replyingTo }) => ({ replyingTo: !replyingTo }));
  };

  render() {
    const { replyingTo } = this.state;
    const { comment, userInfo } = this.props;
    // console.log(this.props.comment);
    console.log(comment);
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
