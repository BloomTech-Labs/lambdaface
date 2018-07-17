import React from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CategoryButton from "./CategoryButton";
import backArrow from "../Assets/BackArrow.svg";
// import "../Styles/AddPost.css";

class AddPost extends React.Component {
  state = {
    content: '',
    userId: this.props.userInfo.sub,
    // get category from props, do not let AllPosts be an option
    category: this.props.category[0] === "AllPosts" ? ["Announcements", 1] : this.props.category,
    postId: null,
  };

  componentDidMount() {
    // console.log(this.props)
    if (this.props.isEditing) {
      this.setActivePost();
    }
  }
  setActivePost = () => {
    const { content, postId } = this.props;
    this.setState({ content, postId });
  }
  handleChange = event => {
    this.setState({
      content: event.target.value,
    });
  };

  changeCategory = category => {
    this.setState({ category });
  }

  submitPost = async event => {
    event.preventDefault();
    const { content, userId, category, postId } = this.state;
    const newPost = {
      content,
      userId,
      categoryId: category[1],
    };

    if (this.props.isEditing) {
      axios
        .put(`${process.env.REACT_APP_URL}api/post/${postId}/${userId}`, { content })
        .then(() => {
          this.setState({ content: '' })
          this.props.changeCurrentCategory(['PostPage', null], postId)();
        })
        .catch(error => console.error(error));
    } else {
      axios
        .post(`${process.env.REACT_APP_URL}api/posts`, newPost)
        .then(() => {
          this.setState({ content: '' });
          this.props.changeCurrentCategory([...this.state.category])();
        })
        .catch(error => console.error(error));
    }
  };

  render() {
    const category = this.state.category;
    const { firstName, lastName, profilePicture } = this.props.userInfo;

    return (
      <div className="add-post__container">
        <div className="container__left-col">
          <IconButton onClick={this.props.changeCurrentCategory(this.props.category)}>
            <img src={backArrow} alt="Back" height="30px" width="30px" />
          </IconButton>
        </div>

        <div className="container__right-col">
          <h4>Add a Post</h4>
          <textarea
            style={{ resize: "none" }}
            className="right-col__text-area"
            value={this.state.content}
            onChange={this.handleChange}
            cols="30"
            rows="10"
          />
          <div className="right-col__bottom-row">
            <div className="bottom-row__left" />
            <div className="bottom-row__right">
              <CategoryButton 
                category={category}
                changeCategory={this.changeCategory}
                categories={this.props.options}
              />
              <div className="bottom-row__right-user">
                <img src={profilePicture} alt="AddPost-ProfilePic" className="bottom-row__right-picture" />
                <span className="bottom-row__right-name">{firstName} {lastName}</span>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={this.submitPost}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddPost;
