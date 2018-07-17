import React from "react";

import axios from "axios";
import UserBar from "./UserBar";

class WriteComment extends React.Component {
  state = {
    content: '',
  };

  handleChange = event => {
    this.setState({
      content: event.target.value
    });
  };

  submitComment = async () => {
    const { content } = this.state;
    const {
      userInfo,
      commentInfo: { parentId, parentType },
      reloadComments,
    } = this.props;

    try {
      if (content.replace(/\n| /g, '') === '') {
        throw new Error('Comment requires content in order to be submitted!');
      }

      const newComment = {
        content,
        userId: userInfo.sub,
        parentId,
        parentType,
      };

      await axios.post(`${process.env.REACT_APP_URL}api/comments`, newComment);
      this.setState({ content: '' });
      reloadComments();

    } catch(error) {
      if (error) {
        console.error({ message: 'couldn\'t submit new comment', error });
      }
    }


    // if (newComment.content.replace(/\n| /g, '').length > 0) {
    //   axios
    //     .post(`${process.env.REACT_APP_URL}`.concat('api/comments'), newComment)
    //     .then(res => {
    //       // TODO: do something with the response, preferably something useful
    //       this.setState({ content: "" });
    //       this.props.reloadComments();
    //     })
    //     .catch(err => {
    //       console.error(err);
    //     });
    // } else {console.log('Comment requires content in order to be submitted!')}
  };

  render() {
    return (
      <form>
        <textarea
          className="write-comment__textarea"
          placeholder="Write your comment"
          value={this.state.content}
          onChange={this.handleChange}
          cols="30"
          rows="10"
        />
        <UserBar
          type="writecomment"
          info={this.props.userInfo}
          submitComment={this.submitComment}
          imageHash={this.props.imageHash}
        />
      </form>
    );
  }
}

export default WriteComment;
