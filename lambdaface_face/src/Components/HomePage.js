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
    user: {},
    currentCategory: ['AllPosts', '0'],
    previousCategory: [null, null],
    currentPost: {},
    posts: [],
    searchResults: [],
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
    this.getUserInfo();
  }

  getPosts = () => {
    axios
      .get(`${process.env.REACT_APP_URL}`.concat('api/posts'))
      .then(res => {
        // console.log(res.data);
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.error('Could not get posts: ', err);
      });
  };

  getUserInfo = () => {
    const jwtDecode = require('jwt-decode');
    const token = localStorage.getItem('id_token');

    let userInfo = {sub: '', name: ''};
  
    if (token) {
      userInfo = jwtDecode(token);
      this.setState({ user: userInfo });
    }
  };



  changeCurrentCategory = (category, post = null) => event => {
    event.preventDefault();
    const noSpaces = [category[0].split(" ").join(""), category[1]];
    this.setState({ previousCategory: this.state.currentCategory, currentCategory: noSpaces });
    if (category[0].includes("Search")) {
      this.searchResults(category[0].slice(20, category[0].length));
    }
    if (post) this.setState({ currentPost: { ...post } });
  };
  
  searchResults = (query) => {
    axios
    .get(`${process.env.REACT_APP_URL}api/posts/search?=`.concat(`${this.state.query}`))
      .then((res) => {
        console.log("QUERY!", query);
        this.setState({ searchResults: res.data })
      })
      .catch((err) => {
        console.log('ERROR', err);
      })
  };

  categorySwitch = (currentCategory, currentPost) => {
    switch (currentCategory[0].substring(0,17)) {
      case "AddPost":
        return <AddPost category={this.state.previousCategory} options={this.state.postOptions} />;
      case "UserSettings":
        return <UserSettings userInfo={this.state.user} />;
      case "PostPage":
        return <PostPage post={currentPost} />;
      case "SearchResultsfor:":
        return (<PostList 
          postsArr={this.state.searchResults} 
          category={this.state.currentCategory}
          changeCurrentCategory={this.changeCurrentCategory}
        />);
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
    console.log(this.state);
    const currentCategory = this.state.currentCategory;
    const currentPost = this.state.currentPost;
    return (
      <div>
        <TopBar 
          changeCurrentCategory={this.changeCurrentCategory}
          userInfo={this.state.user}
        />
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
