import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {BrowserRouter as Router, Route, Link } from "react-router-dom";
import PostList from './PostList';

class LeftNav extends React.Component {
  state = {
    category:''
  }

  render() {
    return (
    // <ul>
      //   <li>
      //     <div>
      //       Hello 
      //     </div>
      //   </li>
      // </ul>
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
            <Route path="/AllPosts" exact  render={() => (<PostList postsArr={this.props.posts}/>)} />
            <Route path={`/${this.state.category}`} exact render={() => (<PostList postsArr={this.props.posts.filter(post => post.category.split(' ').join('') === this.state.category)}/>)} />
          </div>
        </div>
      </Router>
    )
  }
}

export default LeftNav;
// const Category = (props) => {
//   return (
//     <Link to={`/${props.title.split(' ').join('')}`}>
//       <ListItem button action={() => }>
//         <ListItemText primary={props.title} />
//       </ListItem>
//     </Link>
//   )
// }