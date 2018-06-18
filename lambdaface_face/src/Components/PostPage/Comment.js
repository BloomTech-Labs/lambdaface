import React from "react";

import UserBar from "./UserBar";
import WriteReply from "./WriteReply";

class Comment extends React.Component {
  state = {
    replyingTo: false
  };

  toggleReplyingTo = () => {
    this.setState({ replyingTo: !this.state.replyingTo });
  };

  render() {
    const replyingTo = this.state.replyingTo;

    return (
      <div>
        <div>{this.props.comment.content}</div>
        <UserBar
          type="comment"
          info={this.props.comment}
          toggleReply={this.toggleReplyingTo}
        />
        {replyingTo && <WriteReply />}
      </div>
    );
  }
}

export default Comment;
