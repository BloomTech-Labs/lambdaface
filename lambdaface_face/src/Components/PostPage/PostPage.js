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
    currentPost: {},
    currentPostId: '',
    following: null
  };

  componentDidMount() {
    this.getComments();
  }

  componentDidUpdate() {
    if (this.state.currentPostId !== this.props.postId) {
      this.getComments();
    }
  }

  getComments = () => {
    // console.log(this.props.post);
    const parentId = this.props.postId;
    const userId = this.props.userInfo.sub;
    axios
      .get(`${process.env.REACT_APP_URL}`.concat(`api/post/${parentId}/${userId}`))
      .then(resp => {
        const post = resp.data;
        axios
          .get(`${process.env.REACT_APP_URL}`.concat(`api/comments/${parentId}`))
          .then(res => {
            // console.log(res.data);
            this.setState({ comments: [...res.data], currentPost: {...post}, commentsLoaded: true, currentPostId: post.id, following: post.following || false })
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
    const { comments, commentsLoaded, currentPost } = this.state;
    const { userInfo } = this.props;
    return (
      <div className="post-page__container">
        {commentsLoaded ?
          <div>
            <div className="post-page__post">
              <div className="post__left-col">
                <IconButton onClick={this.props.changeCurrentCategory(this.props.category)}>
                  <img src={backArrow} alt="Back" height="30px" width="30px" />
                </IconButton>
              </div>

              <div className="post__right-col">
                <ReactMarkdown className="markdown" source={currentPost.content} />
                <UserBar type="singlepost" info={currentPost} currentUser={userInfo} following={this.state.following} toggleFollowing={this.toggleFollowing} />
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
                commentInfo={{ parentId: this.props.postId, parentType: 'post' }}
                userInfo={this.props.userInfo}
                reloadComments={this.getComments}
              />
            </div>
          </div>
        : <div>Loading...</div>
        }
      </div>
    );
  }
}

export default PostPage;
