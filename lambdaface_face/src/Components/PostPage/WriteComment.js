import React from "react";

import axios from "axios";
import UserBar from "./UserBar";

class WriteComment extends React.Component {
  state = {
    content: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  submitComment = () => event => {
    const newComment = {
      content: this.state.content,
      // TODO, make user dynamic
      userId: this.props.userInfo.sub,
      parentId: this.props.commentInfo.parentId,
      parentType: this.props.commentInfo.parentType
    };

    if (newComment.content.replace(/\n| /g, '').length > 0) {
      axios
        .post(`${process.env.REACT_APP_URL}`.concat('api/comments'), newComment)
        .then(res => {
          // TODO: do something with the response, preferably something useful
          this.setState({ content: "" });
          this.props.reloadComments();
        })
        .catch(err => {
          console.error(err);
        });
    } else {console.log('Comment requires content in order to be submitted!')}
  };

  render() {
    return (
      <form>
        <textarea
          className="write-comment__textarea"
          placeholder="Write your comment"
          style={{ resize: "none" }}
          value={this.state.content}
          onChange={this.handleChange("content")}
          cols="30"
          rows="10"
        />
        <UserBar
          type="writecomment"
          info={this.props.userInfo}
          submitComment={this.submitComment}
        />
      </form>
    );
  }
}

export default WriteComment;
