import React from "react";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

import IconButton from "@material-ui/core/IconButton";

import Comment from "./Comment";
import WriteComment from "./WriteComment";
import UserBar from './UserBar';
import UserMenu from './UserMenu';

// import "../../Styles/PostPage.css";
import backArrow from "../../Assets/BackArrow.svg";

class PostPage extends React.Component {
  state = {
    comments: [],
    commentsLoaded: false,
    postLoaded: false,
    currentPost: {},
    currentPostId: '',
    following: null,
    hasUserVoted: null,
    editCommentId: null,
  };

  componentDidMount() {
    if (!this.state.postLoaded) {
      this.getPost();
    }
    this.getComments();
  }

  componentDidUpdate() {
    if (this.state.currentPostId !== this.props.postId) {
      this.getComments();
    }
  }

  getPost = async () => {
    const { postId, userInfo } = this.props;

    try {
      const post = await axios
        .get(`${process.env.REACT_APP_URL}api/post/${postId}/${userInfo.sub}`)
        .then(({ data }) => data);
      
      if (!post) {
        throw new Error({ message: 'Post not found.', post, postId });
      }

      this.setState({
        postLoaded: true,
        currentPost: { ...post },
        following: post.following || false,
        hasUserVoted: post.hasUserVoted,
        currentPostId: post.id,
      })
    } catch (error) {
      if (error) {
        console.error({ message: 'Couldn\'t get post!', error});
      }
    }
  }

  getComments = async () => {
    const parentId = this.props.postId;
    const userId = this.props.userInfo.sub;

    try {
      const comments = await axios
        .get(`${process.env.REACT_APP_URL}api/comments/${parentId}/${userId}`)
        .then(({ data }) => data);

      if (comments === undefined || comments instanceof Error) {
        throw new Error({ message: 'Comments not found!', comments });
      }

      this.setState({
        comments,
        commentsLoaded: true,
      });
    } catch (error) {
      if (error) {
        console.error({ message: 'Couldn\'t fetch comments!', error })
      }
    }
  };

  editComment = editCommentId => {
    this.setState({ editCommentId });
  }

  toggleFollowing = () => {
    // console.log('Following has been toggled!')
    this.setState(prev => ({
      following: !prev.following,
    }));
  }

  handleDelete = () => {
    const postId = this.props.postId;
    const userId = this.props.userInfo.sub;

    axios
      .delete(`${process.env.REACT_APP_URL}api/post/${postId}/${userId}`)
      .then(() => {
        this.props.changeCurrentCategory(['All Posts', 0])();
      });
  }
  
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
                { userInfo.sub === currentPost.userId 
                  ? <UserMenu handleEdit={this.handleClick} handleDelete={this.handleDelete} />
                  : ''
                }
                <UserBar type="singlepost" hasUserVoted={hasUserVoted} info={currentPost} currentUser={userInfo} following={this.state.following} toggleFollowing={this.toggleFollowing} imageHash={this.props.imageHash} />
              </div>
            </div>
            <div className="post-page__comments">
              <div className="post-page__comments-header">Comments</div>
              { commentsLoaded 
                ? comments
                  .filter(comment => !this.state.editCommentId || comment.id !== this.state.editCommentId)
                  .map(comment => (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      userInfo={userInfo}
                      reloadComments={this.getComments}
                      imageHash={this.props.imageHash}
                      editComment={() => this.editComment(comment.id)}
                    />
                  ))
                : <div>Loading Comments... </div>
              }
              <div className="post-page__new-comment-header">Write a comment</div>
              <WriteComment
                comment={comments.find(comment => comment.id === this.state.editCommentId)}
                editComment={this.editComment}
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
