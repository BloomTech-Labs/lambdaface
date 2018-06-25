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
    this.setState({ currentCategory: noSpaces });
    if (this.state.currentCategory[1] !== null) this.setState({ previousCategory: this.state.currentCategory });
    if (category[0].includes("Search")) {
      this.searchResults(category[0].slice(20, category[0].length));
    }
    if (post) this.setState({ currentPost: { ...post } });
  };
  
  searchResults = (query) => {
    if (query) {
      query = query.replace(/\s+/g, '%20');
      axios
      .get(`${process.env.REACT_APP_URL}api/search/`.concat(`${query}`))
        .then((res) => {
          this.setState({ searchResults: res.data })
        })
        .catch((err) => {
          console.error('ERROR', err);
        })
    } else {
      console.error("Empty Query")
    }
  };

  categorySwitch = (currentCategory, currentPost) => {
    switch (currentCategory[0].substring(0,17)) {
      case "AddPost":
        return <AddPost category={this.state.previousCategory} options={this.state.postOptions} changeCurrentCategory={this.changeCurrentCategory} userInfo={this.state.user} />;
      case "UserSettings":
        return <UserSettings changeCurrentCategory={this.changeCurrentCategory} category={this.state.previousCategory} userInfo={this.state.user} />;
      case "PostPage":
        return <PostPage post={currentPost} changeCurrentCategory={this.changeCurrentCategory} category={this.state.previousCategory} userInfo={this.state.user} />;
      case "SearchResultsfor:":
        return (<PostList 
          currentUser={this.state.user}
          postsArr={this.state.searchResults} 
          category={this.state.currentCategory}
          changeCurrentCategory={this.changeCurrentCategory}
        />);
      default:
        return (
          <PostList
            currentUser={this.state.user}
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
