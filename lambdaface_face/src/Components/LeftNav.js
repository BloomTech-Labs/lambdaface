import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {BrowserRouter as Router, Route, Link } from "react-router-dom";
import PostList from './PostList';
import AddPost from './AddPost';

class LeftNav extends React.Component {
  state = {
    category:''
  }

  render() {
    return (
      <Router>
        <div>
          <List component="nav">
            {this.props.options.map((category, i) => {
              return (
                <Link key = {i} to={`/${category.split(' ').join('')}`}>
                  <ListItem button onClick={() => {
                    this.setState({category: category.split(' ').join('')})
                    }} >

                    <ListItemText primary={category} />
                  </ListItem>
                </Link>
              )
            })}
          </List>
        
          <div className="PostList">
            <Route path="/AllPosts" exact  render={() => (<PostList category={this.state.category} postsArr={this.props.posts}/>)} />
            <Route path={`/${this.state.category}`} exact render={() => (<PostList category={this.state.category} postsArr={this.props.posts.filter(post => post.category.split(' ').join('') === this.state.category)}/>)} />
            <Route path="/AddPost" exact  component={AddPost} />
            
          </div>
        </div>
      </Router>
    )
  }
}

export default LeftNav;
