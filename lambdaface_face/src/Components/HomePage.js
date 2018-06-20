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
    currentCategory: ['AllPosts', '0'],
    previousCategory: [null, null],
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
    this.getPosts();
  }

  getPosts = () => {
    axios
      .get(`http://localhost:5000/api/posts`)
      .then(res => {
        // console.log(res.data);
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.error('Could not get posts: ', err);
      });
  };

  changeCurrentCategory = (category, post = null) => event => {
    const noSpaces = [category[0].split(" ").join(""), category[1]];
    this.setState({ previousCategory: this.state.currentCategory, currentCategory: noSpaces });
    if (post) this.setState({ currentPost: { ...post } });
  };

  categorySwitch = (currentCategory, currentPost) => {
    switch (currentCategory[0]) {
      case "AddPost":
        return <AddPost category={this.state.previousCategory} options={this.state.postOptions} />;
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
                if (this.state.currentCategory[0] === 'AllPosts') return true;
                // TODO, DO NOT ALLOW post.categoryID to be 'null'
                // if (post.category === undefined) return true;
                return post.categoryId === this.state.currentCategory[1]
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
