import React from "react";
import axios from 'axios';

import LeftNav from "./LeftNav";
import PostList from "./PostList";
import AddPost from "./AddPost";
import UserSettings from "./UserSettings";
import PostPage from "./PostPage/PostPage";
import TopBar from "./TopBar";

class HomePage extends React.Component {
  state = {
    // user: {},
    currentCategory: "",
    currentPost: {},
    posts: [],
    postOptions: [
      "All Posts",
      "Announcements",
      "Dev Team",
      "Design Team",
      "Marketing",
      "HR",
      "Product Managers",
      "QA"
    ]
  };

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_URL}`.concat('api/posts'))
      .then(res => {
        console.log(res.data);
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.error('Could not get posts: ', err);
      })
  }

  changeCurrentCategory = (category, post = null) => event => {
    this.setState({ currentCategory: category.split(" ").join("") });
    if (post) this.setState({ currentPost: { ...post } });
  };

  categorySwitch = (currentCategory, currentPost) => {
    switch (currentCategory) {
      case "AddPost":
        return <AddPost />;
      case "UserSettings":
        return <UserSettings />;
      case "PostPage":
        return <PostPage post={currentPost} />;
      default:
        return (
          <PostList
            changeCurrentCategory={this.changeCurrentCategory}
            category={this.state.currentCategory}
            postsArr={this.state.posts.filter(
              post => {
                if (this.state.currentCategory === 'AllPosts') return true;
                return post.category.split(" ").join("") === this.state.currentCategory
              }
            )}
          />
        );
    }
  };

  render() {
    const currentCategory = this.state.currentCategory;
    const currentPost = this.state.currentPost;

    return (
      <div>
        <TopBar changeCurrentCategory={this.changeCurrentCategory} />
        <div className="LeftNav">
          <LeftNav
            options={this.state.postOptions}
            posts={this.state.posts}
            changeCurrentCategory={this.changeCurrentCategory}
          />
        </div>
        <div>{this.categorySwitch(currentCategory, currentPost)}</div>
      </div>
    );
  }
}

export default HomePage;
