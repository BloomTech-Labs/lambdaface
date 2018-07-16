import React from "react";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

import IconButton from "@material-ui/core/IconButton";

import Comment from "./Comment";
import WriteComment from "./WriteComment";
import UserBar from './UserBar';

// import "../../Styles/PostPage.css";
import backArrow from "../../Assets/BackArrow.svg";
import Button from "@material-ui/core/Button";

class PostPage extends React.Component {
  state = {
    comments: [],
    commentsLoaded: false,
    currentPost: {},
    currentPostId: '',
    following: null,
    hasUserVoted: null,
  };

  componentDidMount() {
    this.getComments();
  }

  componentDidUpdate() {
    if (this.state.currentPostId !== this.props.postId) {
      this.getComments();
    }
  }

  getComments = async () => {
    // console.log(this.props.post);
    const parentId = this.props.postId;
    const userId = this.props.userInfo.sub;

    const post = await axios
      .get(`${process.env.REACT_APP_URL}api/post/${parentId}/${userId}`)
      .then(({ data }) => data)
      .catch(error => console.error(error));

    const comments = await axios
      .get(`${process.env.REACT_APP_URL}api/comments/${parentId}/${userId}`)
      .then(({ data }) => data)
      .catch(error => console.error(error));

    if (!post || comments === undefined) {
      console.error({
        message: 'Couldn\'t fetch post or comments!',
        post,
        comments,
      });
    }
    
    this.setState({
      comments,
      currentPost: { ...post },
      commentsLoaded: true,
      currentPostId: post.id,
      following: post.following || false,
      hasUserVoted: post.hasUserVoted,
    });
  };

  toggleFollowing = () => {
    // console.log('Following has been toggled!')
    this.setState(prev => ({
      following: !prev.following,
    }));
  }

<<<<<<< HEAD
=======
  handleDelete = () => {
    const postId = this.props.postId;
    const userId = this.props.userInfo.sub;

    axios
      .delete(`${process.env.REACT_APP_URL}api/post/${postId}/${userId}`)
      .then(() => {
        this.props.changeCurrentCategory(['All Posts', 0])();
      });
  }
  
>>>>>>> 2fa6065bf427be90ebe5f0b0e17fd2e4f310b446
  handleClick = () => {
    this.props.toggleEditingPost(true);
    this.props.changeCurrentCategory(['AddPost', null], this.state.currentPost.id)();
  }

  render() {
    const { comments, commentsLoaded, currentPost, hasUserVoted } = this.state;
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
                <UserBar type="singlepost" hasUserVoted={hasUserVoted} info={currentPost} currentUser={userInfo} following={this.state.following} toggleFollowing={this.toggleFollowing} imageHash={this.props.imageHash} />
                {userInfo.sub === currentPost.userId 
                  ? <div>
                      <Button
                        variant="contained"
                        color="primary" 
                        className="post-page__edit-btn" 
                        onClick={this.handleClick}
                      >edit</Button>
                      <Button
                        variant="contained"
                        color="primary" 
                        className="post-page__delete-btn" 
                        onClick={this.handleDelete}
                      >delete</Button>
                    </div>
                  : ''
                }
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
                  imageHash={this.props.imageHash}
                />
                ))
              : <div>Loading Comments... </div>
          }
              <div className="post-page__new-comment-header">Write a comment</div>
              <WriteComment
                commentInfo={{ parentId: this.props.postId, parentType: 'post' }}
                userInfo={this.props.userInfo}
                reloadComments={this.getComments}
                imageHash={this.props.imageHash}
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
