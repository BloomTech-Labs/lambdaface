import React from 'react';
import Topbar from './TopBar';
import LeftNav from './LeftNav';
import PostList from './PostList';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class HomePage extends React.Component {
  state = {
    user: {},
    posts: [
      {title: 'Announcements Title', author: 'Matt', updown: [55,3], category: 'Announcements', Date: Date.now, comments: ['hi', 'ok']}, 
      {title: 'Announcements Title2', author: 'Matt', updown: [55,3], category: 'Announcements', Date: Date.now, comments: ['hi', 'ok']}, 
      {title: 'Dev Team Title2', author: 'John', updown: [88,43], category: 'Dev Team', Date: Date.now, comments: ['red', 'oak']},
      {title: 'Dev Team Title', author: 'John', updown: [88,43], category: 'Dev Team', Date: Date.now, comments: ['red', 'oak']}
    ],
    postOptions:  ['All Posts', 'Announcements', 'Dev Team'],
  };
  render() {
    return (
      <Router>
        <div>
          <div className="Topbar">
            <Topbar />
          </div>
          <div className="LeftNav">
            <LeftNav options={this.state.postOptions} posts={this.state.posts}/>
          </div>
        </div>
      </Router>
    )
  }; 
};

export default HomePage;