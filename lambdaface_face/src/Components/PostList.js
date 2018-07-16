import React from "react";
import removeMd from 'remove-markdown';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";

import UserBar from "./PostPage/UserBar";
import FilterMenu from "./FilterMenu";
// import "../Styles/PostList.css";

export default class PostList extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = () => {
    /**
     * function for onScroll event listener
     * if we are at the bottom of the page calls updateCurrentPage
     */
    const scrollBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    if (this.props.morePosts && scrollBottom) {
      this.props.updateCurrentPage();
      this.props.getPosts(true);
    }
  }

  insertSpaces = (string) => {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    return string;
  }

  header = () => {
    const category = this.insertSpaces(this.props.category[0]);
    return (
      <div className="postList__header">
        <h1 className="postList__header-category">{category}</h1>
        <FilterMenu
          className="postList__header-filter"
          handleNewest={this.props.handleNewest}
        />
        <Button 
          className="postList__header-addPost" 
          variant="contained" 
          color="primary" 
          onClick={() => this.props.changeCurrentCategory(["AddPost", null])()}
        >
          Add Post
        </Button>
      </div>
    );
  }
  render(){
    const getPreviewReady = content => {
      const preview = removeMd(content);
      if (preview.length > 140) {
        return preview.slice(0, 140) + '...';
      }
      return preview;
    }
    return (
      <div className="postList__container">
        {this.header()}
        <List>
          {this.props.postsArr.map((post, i) => {
            const postPreview = getPreviewReady(post.content);

            return (
              <ListItem
                className={i % 2 ? "postList__listItem-odd" : "postList__listItem-even"}
                style={{ alignItems: "flex-start" }}
                key={post.id}
                onClick={this.props.changeCurrentCategory(["PostPage", null], post.id)}
              >
                <ListItemText className="listItem__top" primary={postPreview} />
                <UserBar className="listItem__bottom" info={post} type="allposts" imageHash={this.props.imageHash} />
              </ListItem>
            );
          })}
        </List>
      </div>
    )
  }
}

