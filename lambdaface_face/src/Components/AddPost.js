import React from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CategoryButton from "./CategoryButton";
import backArrow from "../Assets/BackArrow.svg";
import "../Styles/AddPost.css";

class AddPost extends React.Component {
  state = {
    // TODO: figure out where title fits in with given Sketch
    content: "",
    // get category from props, do not let AllPosts be an option
    category: this.props.category[0] === "AllPosts" ? ["Announcements", 1] : this.props.category
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  changeCategory = category => {
    this.setState({
      category: category
    });
  }

  submitPost = () => event => {
    event.preventDefault();
    const newPost = {
      title: this.state.content.slice(0, 40),
      content: this.state.content,
      userId: this.props.userInfo.sub,
      categoryId: this.state.category[1],
    };
    // TODO: ADD dynamic userId
    axios
      .post(`${process.env.REACT_APP_URL}`.concat('api/posts'), newPost)
      .then(res => {
        // console.log(res);
        this.setState({ content: "" });
        // TODO: ADD redirect to last page
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const category = this.state.category;
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
            onChange={this.handleChange("content")}
            cols="30"
            rows="10"
          />
          <div className="right-col__bottom-row">
            <div className="bottom-row__left">
              {/* TODO: make these elements format textarea text */}
              <span>B</span>
              <div>List</div>
              <div>List</div>
            </div>
            <div className="bottom-row__right">
              <CategoryButton category={category} changeCategory={this.changeCategory} categories={this.props.options} />
              {/* TODO: get avatar & name dynamically */}
              <div className="bottom-row__right-circle" />
              <span>John Doe</span>
              <Button
                variant="contained"
                color="primary"
                onClick={this.submitPost()}
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
