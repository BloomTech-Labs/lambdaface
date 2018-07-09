import React from "react";
import axios from 'axios';

import LeftNav from "./LeftNav";
import PostList from "./PostList";
import AddPost from "./AddPost";
import UserSettings from "./UserSettings";
import PostPage from "./PostPage/PostPage";
import TopBar from "./TopBar";
import Footer from "./Footer";

class HomePage extends React.Component {
  state = {
    user: {},
    currentCategory: ['AllPosts', '0'],
    previousCategory: [null, null],
    currentPost: {},
    posts: [],
    notifications: [],
    postsLoaded: false,
    morePosts: true,
    currentPage: 1,
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
    ],
    imageHash: Date.now(),
  };

  async componentDidMount() {
    await this.getPosts();
    await this.getUserInfo();
    this.openWS();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate() {
    // console.log('just updated');
    if (!this.state.postsLoaded) {
      this.getPosts();
    }
  }

  componentWillUnmount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  getPosts = (addingPosts = false) => {
    const fetchUrl = `${process.env.REACT_APP_URL}api/posts/${this.state.currentPage}/${this.state.currentCategory[1]}`;

    return axios
      .get(fetchUrl)
      .then(res => {
        if (!this.state.postsLoaded) {
          this.setState({ posts: res.data, postsLoaded: true });
        } else if (addingPosts) {
          if (res.data.length) {
            this.setState(({ posts }) => ({
              posts: [ ...posts, ...res.data ],
              postsLoaded: true,
            }));
          } else {
            this.setState({ morePosts: false });
          }
        }
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
      return axios.get(`${process.env.REACT_APP_URL}`.concat(`api/users/${userInfo.sub}`))
        .then((response) => {
          userInfo.firstName = response.data[0].firstName;
          userInfo.lastName = response.data[0].lastName;
          userInfo.profilePicture = response.data[0].profilePicture;
          this.setState({ user: userInfo });
        })
    }
  };

  getNewestPosts = () => {
    axios
      .get(`${process.env.REACT_APP_URL}api/posts/1/newest`)
      .then((res) => {
        this.setState({ currentCategory: ["Newest", '0'] })
        this.setState({ posts: res.data })
      })
      .catch((err) => {
        console.error('ERROR', err)
      })
  }

  updateImageHash = () => {
    this.setState({ imageHash: Date.now() })
  }

  openWS = () => {
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    
    if (!window.WebSocket) {
      console.log('Brower doesn\'t support web sockets');
    }

    const connection = new WebSocket(`ws://${process.env.REACT_APP_WSURL}/ws`);
    connection.onopen = () => {
      // console.log('connection opened');
      // console.log(this.state.user);
      connection.send(JSON.stringify({type:'userConnecting', data:this.state.user}));
    }

    connection.onmessage = message => {
      const json = JSON.parse(message.data);
      if (json.type && json.type === 'notifications') {
        try {
          // console.log(json.data);
          this.updateNotifications(json.data);
        } catch (e) {
          // console.log('Invalid JSON: ', message.data);
          return;
        }
      }
      else if (json.type) {
        console.log(json.data);
      }
    }
  }

  updateNotifications = (arr) => {
    if (arr.length > 0) this.setState({ notifications: [...arr] });
  }

  clearNotifications = () => {
    if (this.state.notifications.length) this.setState({ notifications: [] });
  }

  updateCurrentPage = (changeAmmount = 1) => {
    /**
     * updates currentPage by an ammount,
     * defaults to incrementing by 1
     * will not increment if morePosts is false
     */
    if (this.state.morePosts && this.state.currentPage + changeAmmount >= 1) {
      this.setState(({ currentPage }) => ({
        currentPage: currentPage + changeAmmount,
      }));
    }
  }

  handleScroll = () => {
    /**
     * function for onScroll event listener
     * if we are at the bottom of the page calls updateCurrentPage
     */
    const scrollBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    if (this.state.morePosts && scrollBottom) {
      this.updateCurrentPage();
      this.getPosts(true);
    }
  }
  changeCurrentCategory = (category, post = null) => event => {
    /* Posts must be loaded, or the given category must not be part of NavBar options */
    if (this.state.postsLoaded || category[1] === null) {
      if (event) event.preventDefault();
      // TODO: do nothing if given category is same as current
      const noSpaces = [category[0].replace(' ', ''), category[1]];
      this.setState({ currentCategory: noSpaces });
      /* reset posts if the given category is part of NavBar options (this.state.postOptions) */
      if (category[1] !== null) {
        this.setState({ posts: [], postsLoaded: false })
      }
      /* Only NavBar options can be a previous category */
      if (this.state.currentCategory[1] !== null) {
        this.setState({ previousCategory: this.state.currentCategory });
      }
      // TODO: Move search outside of changeCurrentCategory
      if (category[0].includes("Search")) {
        this.searchResults(category[0].slice(20, category[0].length));
      }
      /* set currentPost to given post (default is null) */
      if (post) this.setState({ currentPost: { ...post } });
    }
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
        return <UserSettings changeCurrentCategory={this.changeCurrentCategory} category={this.state.previousCategory} userInfo={this.state.user} imageHash={this.state.imageHash} updateImageHash={this.updateImageHash} logout={this.props.logout} />;
      case "PostPage":
        return <PostPage post={currentPost} changeCurrentCategory={this.changeCurrentCategory} category={this.state.previousCategory} userInfo={this.state.user} />;
      case "SearchResultsFor:":
        return (<PostList
          handleNewest={this.getNewestPosts}
          postsArr={this.state.searchResults} 
          category={this.state.currentCategory}
          changeCurrentCategory={this.changeCurrentCategory}
        />);
      default:
        return (
          <PostList
            handleNewest={this.getNewestPosts}
            changeCurrentCategory={this.changeCurrentCategory}
            category={this.state.currentCategory}
            postsArr={this.state.posts}
          />
        );
    }
  };

  render() {
    const currentCategory = this.state.currentCategory;
    const currentPost = this.state.currentPost;
    return (
      <div className="home-page">
        <div className="home-page__top-bar">
          <TopBar 
            changeCurrentCategory={this.changeCurrentCategory}
            userInfo={this.state.user}
            notifications={[...this.state.notifications]}
            clearNotifications={this.clearNotifications}
            imageHash={this.state.imageHash}
          />
        </div>
        <div className="home-page__bottom">
          <div className="home-page__left-nav">
            <LeftNav
              options={this.state.postOptions}
              changeCurrentCategory={this.changeCurrentCategory}
            />
          </div>
          <div className="home-page__main">
            {this.categorySwitch(currentCategory, currentPost)}
            { this.state.morePosts
                ? ''
                : <span>There are no more posts.</span>
            }
          </div>
        </div>
        <div className="home-page__footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default HomePage;
