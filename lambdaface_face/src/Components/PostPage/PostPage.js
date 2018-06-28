import React from "react";
import axios from 'axios';

import IconButton from "@material-ui/core/IconButton";

import PostFull from "./PostFull";
import Comment from "./Comment";
import WriteComment from "./WriteComment";

// import "../../Styles/PostPage.css";
import backArrow from "../../Assets/BackArrow.svg";

class PostPage extends React.Component {
  state = {
    comments: [],
    commentsLoaded: false
  };

  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    // console.log(this.props.post);
    const parentId = this.props.post.id;
    axios
      .get(`${process.env.REACT_APP_URL}`.concat(`api/comments/${parentId}`))
      .then(res => {
        // console.log(res.data);
        this.setState({ comments: [...res.data], commentsLoaded: true })
      })
      .catch(err => {
        console.error(err);
      });
    // this.setState({ comments: [...testcomments], commentsLoaded: true });
  };

  render() {
    const comments = this.state.comments;
    const commentsLoaded = this.state.commentsLoaded;
    // console.log("rendered post page");
    // console.log(this.state.comments);
    return (
      <div className="post-page__container">
        <div className="post-page__post">
          <div className="post__left-col">
            <IconButton onClick={this.props.changeCurrentCategory(this.props.category)}>
              <img src={backArrow} alt="Back" height="30px" width="30px" />
            </IconButton>
          </div>

          <div className="post__right-col">
            <PostFull post={this.props.post} currentUser={this.props.userInfo.sub} />
          </div>
        </div>
        <div className="post-page__comments">
          <div>Comments</div>
          {commentsLoaded &&
          comments.map((elem, i) => (
            <Comment key={elem.id} comment={elem} userInfo={this.props.userInfo} reloadComments={this.getComments} />
          ))}
          {/* {!commentsLoaded && <div>Loading Comments...</div>} */}
          <div>Write a comment</div>
          <WriteComment
            commentInfo={{ parentId: this.props.post.id, parentType: 'post' }}
            userInfo={this.props.userInfo}
            reloadComments={this.getComments}
          />
        </div>
      </div>
    );
  }
}

export default PostPage;
