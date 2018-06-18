import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PostList from "./PostList";
import AddPost from "./AddPost";
import TopBar from "./TopBar";
import UserSettings from "./UserSettings";
import PostPage from "./PostPage/PostPage";

class LeftNav extends React.Component {
  state = {
    category: "",
    currentPost: {}
  };

  changeCategory = category => event => {
    this.setState({ category: category.split(" ").join("") });
  };

  changeCurrentPost = post => event => {
    this.setState({ currentPost: {...post} })
  }

  render() {
    const currentPost = this.state.currentPost;

    return (
      <Router>
        <div>
          <TopBar changeCategory={this.changeCategory} />
          <List component="nav">
            {this.props.options.map((category, i) => {
              return (
                <Link key={i} to={`/${category.split(" ").join("")}`} href={`/${category.split(" ").join("")}`}>
                  <ListItem button onClick={this.changeCategory(category)}>
                    <ListItemText primary={category} />
                  </ListItem>
                </Link>
              );
            })}
          </List>

          <div className="PostList">
            <Route
              path="/AllPosts"
              exact
              render={() => (
                <PostList
                  changeCurrentPost={this.changeCurrentPost}                  
                  category={this.state.category}
                  postsArr={this.props.posts}
                />
              )}
            />
            <Route
              path={`/${this.state.category}`}
              exact
              render={() =>
                this.state.category === "AllPosts" ||
                this.state.category === "PostPage" ||
                this.state.category === "UserSettings" ? null : (
                  <PostList
                    changeCurrentPost={this.changeCurrentPost}
                    category={this.state.category}
                    postsArr={this.props.posts.filter(
                      post =>
                        post.category.split(" ").join("") ===
                        this.state.category
                    )}
                  />
                )
              }
            />
            <Route path="/AddPost" exact component={AddPost} />
            <Route path="/UserSettings" exact component={UserSettings} />
            <Route
              path="/PostPage"
              exact 
              render={() => (
                <PostPage post={currentPost} />
              )}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default LeftNav;
