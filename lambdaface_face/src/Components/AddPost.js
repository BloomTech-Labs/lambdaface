import React from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import "../Styles/AddPost.css";
import backArrow from "../Assets/BackArrow.svg";

class AddPost extends React.Component {
  state = {
    // TODO: figure out where title fits in with given Sketch
    content: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  submitPost = () => event => {
    event.preventDefault();
    const newPost = { content: this.state.content };
    // TODO: ADD rest of newPost info here, title, content, user_id, category_id
    axios
      .post("https://localhost:5000/api/posts", newPost)
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
    return (
      <div className="add-post__container">
        <div className="container__left-col">
          <img src={backArrow} alt="Back" height="30px" width="30px" />
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
