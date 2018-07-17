import React from "react";
import axios from 'axios';

import LeftNav from "./LeftNav";
import PostList from "./PostList";
import AddPost from "./AddPost";
import UserSettings from "./UserSettings";
import PostPage from "./PostPage/PostPage";
import TopBar from "./TopBar";
import Footer from "./Footer";
import SmallScreenLeftNav from "./SmallScreenLeftNav";

class HomePage extends React.Component {
  state = {
    user: {},
    currentCategory: ['AllPosts', '0'],
    previousCategory: [null, null],
    currentPostId: '',
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
  }

  componentDidUpdate() {
    // console.log('just updated', this.state.postsLoaded, this.state.morePosts);
    if (!this.state.postsLoaded) {
      this.getPosts();
    }
  }

  getPosts = async (addingPosts = false) => {
    const {
      currentPage,
      currentCategory,
      postsLoaded,
    } = this.state;
    
    let fetchUrl = `${process.env.REACT_APP_URL}api/posts/${currentPage}/${currentCategory[1]}`;
    if (currentCategory[0] === 'Newest') {
      fetchUrl += '/newest';
    }
    try {
      const posts = await axios
        .get(fetchUrl)
        .then(({ data }) => data);

      if (!posts.length || posts instanceof Error) {
        throw new Error('no posts fetched!');
      }

      if (!postsLoaded) {
        return this.setState({
          posts,
          postsLoaded: true,
          morePosts: true,
        });
      }

      if (addingPosts && posts.length) {
        return this.setState(prev => ({
          posts: [...prev.posts, ...posts],
          postsLoaded: true,
        }));
      } else {
        this.setState({ morePosts: false });
      }
    } catch(error) {
      if (error) {
        console.error({ message: 'couldn\'t fetch posts!', error});
      }
    }
  };

  getUserInfo = () => {
    const jwtDecode = require('jwt-decode');
    const token = localStorage.getItem('id_token');

    let userInfo = { sub: '', name: '' };

    if (token) {
      userInfo = jwtDecode(token);
      return axios.get(`${process.env.REACT_APP_URL}api/users/${userInfo.sub}`)
        .then((response) => {
          userInfo.firstName = response.data[0].firstName;
          userInfo.lastName = response.data[0].lastName;
          userInfo.profilePicture = response.data[0].profilePicture;
          this.setState({ user: userInfo });
        })
    }
  };

  getNewestPosts = async () => {
    await this.setState(prev => ({
      currentCategory: ['Newest', prev.currentCategory[1]],
      postsLoaded: false,
      posts: [],
      currentPage: 1,
      morePosts: true,
    }));
    this.getPosts();
  }

  updateImageHash = () => {
    this.setState({ imageHash: Date.now() });
  }

  updateUser = (info) => {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        firstName: info.firstName,
        lastName: info.lastName,
      }
    }));
  }

  updatePic = () => {
    const user = this.state.user;
    user.profilePicture = `https://s3-us-west-2.amazonaws.com/lambdaface-photos/photos/${this.state.user.sub}`;
    this.setState({ user: user });
  }

  openWS = () => {
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    if (!window.WebSocket) {
      console.info('Browser doesn\'t support web sockets');
      return;
    }

    const connection = new WebSocket(`ws://localhost:5000/ws`);
    // const connection = new WebSocket(`ws://lambdaserver.bgmi3t5yei.us-west-2.elasticbeanstalk.com/ws`);

    const ping = () => {
      // console.log('Ping!');
      connection.send(JSON.stringify({ type: 'userPinging', data: this.state.user }));
    }

    connection.onopen = () => {
      // console.log('connection opened');
      // console.log(this.state.user);
      connection.send(JSON.stringify({ type: 'userConnecting', data: this.state.user }));
      setInterval(ping, 50 * 1000);
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
      } else if (json.type) {
        console.info(json.data);
      }
    }
  }

  updateNotifications = (arr) => {
    if (arr.length > 0) this.setState({ notifications: this.state.notifications.concat(arr) });
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

  changeCurrentCategory = (category, postId = '', otherF= null, passed = null ) => event => {
    // reset scroll bar
    window.scrollTo(0, 0);
    /* Posts must be loaded, or the given category must not be part of NavBar options */
    if (this.state.postsLoaded || category[1] === null) {
      if (event) event.preventDefault();
      // TODO: do nothing if given category is same as current
      const noSpaces = [category[0].replace(/\s/g, ''), category[1]];
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
      /* set currentPostId to given post (default is null) */
      if (postId) this.setState({ currentPostId: postId });
      /* when we change category reset currentPage to 1 */
      if (typeof otherF === "function") {
        otherF(category, passed)
      }
      this.setState({ currentPage: 1, morePosts: true });
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
  toggleEditingPost = isEditing => {
    this.setState({ isEditing });
  }
  categorySwitch = (currentCategory, currentPostId = '') => {
    let content = this.state.posts.find(post => post.id === currentPostId)
    content = content && content.content;
    switch (currentCategory[0].substring(0,17)) {
      case "AddPost":
        return <AddPost isEditing={this.state.isEditing} content={content} postId={currentPostId} category={this.state.previousCategory} options={this.state.postOptions} changeCurrentCategory={this.changeCurrentCategory} userInfo={this.state.user} />;
      case "UserSettings":
        return <UserSettings changeCurrentCategory={this.changeCurrentCategory} category={this.state.previousCategory} userInfo={this.state.user} imageHash={this.state.imageHash} updateImageHash={this.updateImageHash} updatePic={this.updatePic} updateUser={this.updateUser} logout={this.props.logout} />;
      case "PostPage":
        return <PostPage toggleEditingPost={this.toggleEditingPost} postId={currentPostId} changeCurrentCategory={this.changeCurrentCategory} category={this.state.previousCategory} userInfo={this.state.user} imageHash={this.state.imageHash} />;
      case "SearchResultsFor:":
        return (<PostList
          handleNewest={this.getNewestPosts}
          postsArr={this.state.searchResults}
          category={this.state.currentCategory}
          changeCurrentCategory={this.changeCurrentCategory}
          updateCurrentPage={this.updateCurrentPage}
          getPosts={this.getPosts}
          morePosts={this.state.morePosts}
          imageHash={this.state.imageHash}
        />);
      default:
        return (
          <PostList
            handleNewest={this.getNewestPosts}
            changeCurrentCategory={this.changeCurrentCategory}
            category={this.state.currentCategory}
            postsArr={this.state.posts}
            updateCurrentPage={this.updateCurrentPage}
            getPosts={this.getPosts}
            morePosts={this.state.morePosts}
            imageHash={this.state.imageHash}
          />
        );
    }
  };

  render() {
    const currentCategory = this.state.currentCategory;
    const currentPostId = this.state.currentPostId;
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
        <div className="home-page__small-screen-left-nav">
          <SmallScreenLeftNav
            options={this.state.postOptions}
            changeCurrentCategory={this.changeCurrentCategory}
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
            {this.categorySwitch(currentCategory, currentPostId)}
            {this.state.morePosts
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
