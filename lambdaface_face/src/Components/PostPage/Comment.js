import React from "react";

import UserBar from "./UserBar";
import WriteReply from "./WriteReply";
import Reply from "./Reply";

class Comment extends React.Component {
  state = {
    replyingTo: false
  };

  toggleReplyingTo = () => {
    this.setState({ replyingTo: !this.state.replyingTo });
  };

  render() {
    const replyingTo = this.state.replyingTo;
    // console.log(this.props.comment);

    return (
      <div>
        <div>{this.props.comment.content}</div>
        <UserBar
          type="comment"
          info={this.props.comment}
          toggleReply={this.toggleReplyingTo}
        />
        {this.props.comment.comments.map(elem => <Reply key={elem.id} replyInfo={elem} toggleReplyingTo={this.toggleReplyingTo} /> )}
        {replyingTo && 
          <WriteReply 
            userInfo={this.props.userInfo}
            commentInfo={{parentId: this.props.comment.id, parentType: 'comment'}}
            reloadComments={this.props.reloadComments}
            toggleReplyingTo={this.toggleReplyingTo}
          />}
      </div>
    );
  }
}

export default Comment;
