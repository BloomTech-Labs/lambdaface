import React from "react";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

import IconButton from "@material-ui/core/IconButton";

import Comment from "./Comment";
import WriteComment from "./WriteComment";
import UserBar from './UserBar';

// import "../../Styles/PostPage.css";
import backArrow from "../../Assets/BackArrow.svg";

class PostPage extends React.Component {
  state = {
    comments: [],
    commentsLoaded: false,
    currentPostId: '',
    following: null
  };

  componentDidMount() {
    this.getComments();
  }

  componentDidUpdate() {
    if (this.state.currentPostId !== this.props.post.id) {
      this.getComments();
    }
  }

  getComments = () => {
    // console.log(this.props.post);
    const parentId = this.props.post.id;
    const userId = this.props.userInfo.sub;
    axios
      .get(`${process.env.REACT_APP_URL}`.concat(`api/post/${parentId}/${userId}`))
      .then(resp => {
        const postId = resp.data.id;
        const isFollowing = resp.data.following || false;
        axios
          .get(`${process.env.REACT_APP_URL}`.concat(`api/comments/${parentId}`))
          .then(res => {
            // console.log(res.data);
            this.setState({ comments: [...res.data], commentsLoaded: true, currentPostId: postId, following: isFollowing })
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(error => console.error(error));
    // this.setState({ comments: [...testcomments], commentsLoaded: true });
  };

  toggleFollowing = () => {
    // console.log('Following has been toggled!')
    this.setState(prev => ({
      following: !prev.following
    }));
  }

  render() {
    const { comments, commentsLoaded } = this.state;
    const { userInfo } = this.props;
    return (
      <div className="post-page__container">
        <div className="post-page__post">
          <div className="post__left-col">
            <IconButton onClick={this.props.changeCurrentCategory(this.props.category)}>
              <img src={backArrow} alt="Back" height="30px" width="30px" />
            </IconButton>
          </div>

          <div className="post__right-col">
            <ReactMarkdown className="markdown" source={this.props.post.content} />
            <UserBar type="singlepost" info={this.props.post} currentUser={userInfo} following={this.state.following} toggleFollowing={this.toggleFollowing} />
          </div>
        </div>
        <div className="post-page__comments">
          <div className="post-page__comments-header">Comments</div>
          {
            commentsLoaded 
              ? comments.map(comment => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  userInfo={userInfo}
                  reloadComments={this.getComments}
                />
                ))
              : <div>Loading Comments... </div>
          }
          <div className="post-page__new-comment-header">Write a comment</div>
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
