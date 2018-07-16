import React from "react";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';

import IconButton from "@material-ui/core/IconButton";

import { getPost, deletePost } from '../../Actions/postActions.js';
import { getComments } from '../../Actions/commentActions.js';
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
    postLoaded: false,
  };

  componentDidMount() {
    if (!this.state.postLoaded) {
      this.getPost()
    }
    if (!this.state.commentsLoaded) {
      this.getComments();
    }
  }

  componentDidUpdate() {
    if (this.state.currentPostId !== this.props.postId) {
      this.getComments();
    }
  }
  getPost = async () => {
    const { postId, getPost, userInfo } = this.props;
    await getPost(postId, userInfo.sub);

    const { post } = this.props;
  
    this.setState({
      currentPost: { ...post },
      currentPostId: post.id,
      following: post.following,
      hasUserVoted: post.hasUserVoted,
      postLoaded: true,
    });
  }
  getComments = async () => {
    const { postId, userInfo, getComments } = this.props;
    await getComments(postId, userInfo.sub);

    const { comments } = this.props;

    this.setState({
      comments,
      commentsLoaded: true,
    });
  };

  toggleFollowing = () => {
    // console.log('Following has been toggled!')
    this.setState(prev => ({
      following: !prev.following,
    }));
  }

  handleDelete = async () => {
    const { postId, userInfo, deletePost} = this.props;
    await deletePost(postId, userInfo.sub);

    this.props.changeCurrentCategory(['All Posts', 0])();
  }
  
  handleClick = () => {
    this.props.toggleEditingPost(true);
    this.props.changeCurrentCategory(['AddPost', null], this.state.currentPost.id)();
  }

  render() {
    const { comments, commentsLoaded, postLoaded, currentPost, hasUserVoted } = this.state;
    const { userInfo } = this.props;
    return (
      <div className="post-page__container">
        {postLoaded ?
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
              { commentsLoaded 
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

const mapStateToProps = ({ post, comments }) => {
  return {
    post,
    comments,
  };
};
export default connect(mapStateToProps, { getPost, getComments, deletePost })(PostPage);

// export default PostPage;
