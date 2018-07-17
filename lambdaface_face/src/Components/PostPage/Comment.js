import React from "react";
import axios from 'axios';

import Button from "@material-ui/core/Button";

import UserBar from "./UserBar";
import WriteReply from "./WriteReply";
import Reply from "./Reply";

export default class Comment extends React.Component {
  state = {
    replyingTo: false,
    editReplyId: null,
  };

  toggleReplyingTo = () => {
    this.setState(prev => ({
      replyingTo: !prev.replyingTo,
      editReplyId: prev.replyingTo ? null : prev.editReplyId,
    }));
  };

  editReply = editReplyId => {
    this.setState({ editReplyId, replyingTo: true });
  }

  deleteComment = async (comment, userId, isChild) => {
    try {

      if (comment.userId !== userId) {
        throw new Error('comment userId doesn\'t match logged in user');
      }

      await axios.put(`${process.env.REACT_APP_URL}api/comments/delete/${isChild ? 'child/' : ''}${comment.id}`, { userId });
      console.info('comment deleted!');
      this.props.reloadComments(true);

    } catch (error) {
      if (error) {
        console.error({ message: 'Unable to delete comment', error });
      }
    }
  }

  render() {
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
          ? (
            <div className="comment__delete">
              <Button 
                variant="contained"
                color="primary"
                className="comment__delete"
                onClick={this.props.editComment}
              >
                edit
              </Button>
              <Button 
                variant="contained"
                color="primary"
                className="comment__delete"
                onClick={() => this.deleteComment(comment, userInfo.sub, false)}
              >
                delete
              </Button>
            </div>
          ) : ''
        }
        {comment.replies
          .filter(reply => !this.state.editReplyId || this.state.editReplyId !== reply.id)
          .map(reply => (
            <Reply 
              key={reply.id}
              replyInfo={reply}
              toggleReplyingTo={this.toggleReplyingTo}
              currentUser={userInfo.sub}
              deleteReply={() => this.deleteComment(reply, userInfo.sub, true)}
              editReply={() => this.editReply(reply.id)}
            />
          ))
        }
        { this.state.replyingTo && 
          <WriteReply
            userInfo={userInfo}
            reply={comment.replies.find(reply => reply.id === this.state.editReplyId)}
            commentInfo={{
              parentId: comment.id, 
              parentType: 'comment', 
              parentFirstName: comment.firstName, 
              parentLastName: comment.lastName 
            }}
            isEdit={!!this.state.editReplyId}
            reloadComments={this.props.reloadComments}
            toggleReplyingTo={this.toggleReplyingTo}
          />
        }
      </div>
    );
  }
}
