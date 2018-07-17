import React from "react";
import axios from "axios";

import UserBar from "./UserBar";

class WriteReply extends React.Component {
  state = {
    content: this.props.reply && this.props.reply.content || '',
    isEdit: this.props.isEdit || false,
  };

  handleChange = event => {
    this.setState({
      content: event.target.value,
    });
  };

  submitReply = async () => {
    const {
      reply,
      userInfo,
      commentInfo: { parentId, parentType },
      toggleReplyingTo,
      reloadComments,
    } = this.props;

    const { content, isEdit } = this.state;

    try {
      if (content.replace(/\n| /g, '') === '') {
        throw new Error('A reply requires content to be submitted!');
      }

      if (isEdit) {
        const editedReply = {
          content: content + ' (edited)',
          userId: userInfo.sub,
        };

        await axios.put(`${process.env.REACT_APP_URL}api/comments/child/${reply.id}`, editedReply);
      } else {
        const reply = {
          content,
          userId: userInfo.sub,
          parentId,
          parentType,
        };

        await axios.post(`${process.env.REACT_APP_URL}api/comments`, reply);
      }
      this.setState({ content: '' });
      toggleReplyingTo();
      reloadComments();
    } catch (error) {
      if (error) { 
        console.error({ message: 'Couldn\'t send reply.', error });
      }
    }
  };

  render() {
    // let replyTo = "Replying to " + this.props.commentInfo.parentFirstName + " " + this.props.commentInfo.parentLastName;
    return (
      <form>
        <textarea
          placeholder="Write your reply"
          className="write-reply__textarea"
          value={this.state.content}
          onChange={this.handleChange}
          cols="30"
          rows="4"
        />
        <UserBar
          type="writereply"
          info={this.props.userInfo}
          submitReply={this.submitReply}
          imageHash={this.props.imageHash}
        />
      </form>
    );
  }
}

export default WriteReply;
