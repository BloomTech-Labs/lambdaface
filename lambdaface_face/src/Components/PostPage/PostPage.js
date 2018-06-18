import React from "react";
// import axios from 'axios';

import PostFull from "./PostFull";

import Comment from "./Comment";
import WriteComment from "./WriteComment";

import "../../Styles/PostPage.css";
import backArrow from "../../Assets/BackArrow.svg";

const testcomments = [
  {
    uuid: "fffff4",
    content: "Test comment Content for rizzle",
    User: "billy",
    upvotes: "236",
    downvotes: "35",
    createdAt: "yesterday",
    updatedAt: "today"
  },
  {
    uuid: "fffff433",
    content: "Test comment Content numbah 2",
    User: "timmy",
    upvotes: "32",
    downvotes: "36",
    createdAt: "yesterday",
    updatedAt: "today"
  },
  {
    uuid: "fffdddff4",
    content: "Test comment Content fnumbah 3",
    User: "jimmy",
    upvotes: "7",
    downvotes: "37",
    createdAt: "yesterday",
    updatedAt: "today"
  }
];

class PostPage extends React.Component {
  state = {
    comments: [],
    commentsLoaded: false
  };

  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    // const parentId = this.props.post.uuid;
    // axios
    //   .get(`http://localhost:5000/api/comments/${parentId}`)
    //   .then(res => {
    //     console.log(res.data);
    //     this.setState({ comments: [...res.data], commentsLoaded: true })
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
    this.setState({ comments: [...testcomments], commentsLoaded: true });
  };

  render() {
    const comments = this.state.comments;
    const commentsLoaded = this.state.commentsLoaded;
    // console.log("rendered post page");
    // console.log(this.state.comments);

    return (
      <div className="post-page__container">
        <div className="post-page__left-col">
          <img src={backArrow} alt="Back" height="30px" width="30px" />
        </div>

        <div className="post-page__right-col">
          <PostFull post={this.props.post} />
          <div>Comments</div>
          {commentsLoaded &&
            comments.map((elem, i) => (
              <Comment key={`comment ${i}`} comment={elem} />
            ))}
          {!commentsLoaded && <div>Loading Comments...</div>}
          <div>Write a comment</div>
          <WriteComment />
        </div>
      </div>
    );
  }
}

export default PostPage;
