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
    const newComment = { content: this.state.content };
    axios
      .post("http://localhost5000/api/comments", newComment)
      .then(res => {
        // TODO: do something with the response, preferably something useful
        this.setState({ content: "" });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <form>
        <textarea
          style={{ resize: "none" }}
          value={this.state.content}
          onChange={this.handleChange("content")}
          cols="30"
          rows="10"
        />
        <UserBar
          type="writecomment"
          info={{ User: "rambo" }}
          submitComment={this.submitComment}
        />
      </form>
    );
  }
}

export default WriteComment;
