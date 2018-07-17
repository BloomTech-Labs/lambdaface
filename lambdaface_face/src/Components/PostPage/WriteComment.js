import React from "react";

import axios from "axios";
import UserBar from "./UserBar";

class WriteComment extends React.Component {
  state = {
    content: '',
    isEditing: false,
  };
  componentDidUpdate() {
    if ((this.props.comment && this.props.comment.content) && this.state.isEditing === false) {
      this.setCommentContent();
    }
  }
  setCommentContent = () => {
    this.setState({
      content: this.props.comment.content,
      isEditing: true,
    });
  }
  handleChange = event => {
    this.setState({
      content: event.target.value
    });
  };

  submitComment = async () => {
    const { content, isEditing } = this.state;
    const {
      comment,
      userInfo,
      commentInfo: { parentId, parentType },
      reloadComments,
      editComment,
    } = this.props;

    try {
      if (content.replace(/\n| /g, '') === '') {
        throw new Error('Comment requires content in order to be submitted!');
      }

      if (isEditing) {
        const editedComment = {
          content,
          userId: userInfo.sub,
        };
        await axios.put(`${process.env.REACT_APP_URL}api/comments/${comment.id}`, editedComment);
        await editComment(null);
        this.setState({ content: '', isEditing: false });
        reloadComments();
      } else {

        const newComment = {
          content,
          userId: userInfo.sub,
          parentId,
          parentType,
        };

        await axios.post(`${process.env.REACT_APP_URL}api/comments`, newComment);
        this.setState({ content: '' });
        reloadComments();
      }

    } catch(error) {
      if (error) {
        console.error({ message: 'couldn\'t submit new comment', error });
      }
    }
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
