import React from "react";

import axios from "axios";
import UserBar from "./UserBar";

class WriteReply extends React.Component {
  state = {
    content: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  submitReply = () => event => {
    const newReply = {
      content: this.state.content,
      // TODO, make user dynamic
      userId: this.props.userInfo.sub,
      parentId: this.props.commentInfo.parentId,
      parentType: this.props.commentInfo.parentType
    };

    axios
      .post(`${process.env.REACT_APP_URL}`.concat('api/comments'), newReply)
      .then(res => {
        // TODO: do something with the response, preferably something useful
        this.setState({ content: "" });
        this.props.toggleReplyingTo();
        this.props.reloadComments();
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    // let replyTo = "Replying to " + this.props.commentInfo.parentFirstName + " " + this.props.commentInfo.parentLastName;
    let replyTo = "Write your reply"
    return (
      <form>
        <textarea
          placeholder={replyTo}
          className="write-reply__textarea"
          style={{ resize: "none" }}
          value={this.state.content}
          onChange={this.handleChange("content")}
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
