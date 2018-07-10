import React from "react";
import axios from 'axios';

import IconButton from "@material-ui/core/IconButton";

import Comment from "./Comment";
import WriteComment from "./WriteComment";
import UserBar from './UserBar';

// import "../../Styles/PostPage.css";
import backArrow from "../../Assets/BackArrow.svg";

class PostComments extends React.Component {
  state = {
    comments: [],
    commentsLoaded: false,
  };

  componentDidMount() {
    this.getComments();
  }

  getComments = async () => {
    const { parentId } = this.props;
    // TODO: Fix how we increment views
    await axios.get(`${process.env.REACT_APP_URL}api/post/${parentId}`);
    axios
      .get(`${process.env.REACT_APP_URL}api/comments/${parentId}`)
      .then(res => {
        this.setState({
          comments: res.data,
          commentsLoaded: true,
        });
      })
      .catch(error => console.error(error));
    // this.setState({ comments: [...testcomments], commentsLoaded: true });
  }
  
  render() {
    const { comments, commentsLoaded } = this.state;
    const { parentId, userInfo } = this.props;
    return (
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
          commentInfo={{ parentId, parentType: 'post' }}
          userInfo={this.props.userInfo}
          reloadComments={this.getComments}
        />
      </div>
    );
  }
}

export default props => (
  <div className="post-page__container">
    <div className="post-page__post">
      <div className="post__left-col">
        <IconButton onClick={props.changeCurrentCategory(props.category)}>
          <img src={backArrow} alt="Back" height="30px" width="30px" />
        </IconButton>
      </div>

      <div className="post__right-col">
        <div>
        <div>{props.post.content}</div>
        <UserBar type="singlepost" info={props.post} currentUser={props.currentUser} />
        </div>
      </div>
    </div>
    <PostComments parentId={props.post.id} userInfo={props.userInfo} />
  </div>
);
