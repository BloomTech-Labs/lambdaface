import React from 'react';
import Topbar from './TopBar';
import LeftNav from './LeftNav';
import PostList from './PostList';

class HomePage extends React.Component {
  state = {
    user: {},
    posts: [
      {title: 'Announcements Title', author: 'Matt', updown: [55,3], category: 'Annoucements', Date: Date.now, comments: ['hi', 'ok']}, 
      {title: 'Dev Team Title', author: 'John', updown: [88,43], category: 'Dev Team', Date: Date.now, comments: ['red', 'oak']}
    ],
    postOptions:  ['All Posts', 'Annoucements', 'Dev Team'],
  };
  render() {
    return (
      <div>
        <div className="Topbar">
          <Topbar />
        </div>
        <div className="LeftNav">
          <LeftNav options={this.state.postOptions}/>
        </div>
        <div className="PostList">
          <PostList postsArr={this.state.posts}/>
        </div>
      </div>
    )
  }; 
};

export default HomePage;