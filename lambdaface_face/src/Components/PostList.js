import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
// class PostList extends React.Component {
//   state = {
//    postsArr:[]
//   }

//   componentDidMount() {
//     this.setState(...this.props.postsArr);
//   }
//   render () {
//     return (
//       <List>
//         {this.state.postsArr.map((post, i) => {
//           return (
//             <ListItem>
//               <ListItemText primary={post.title}/>
//             </ListItem>
//           )
//         })}
//       </List>
//     )
//   }
// }

// export default PostList;

export default props => {
  return (
    props.category && (
      <div>
        <div>
          <h1>{props.category}</h1>
          <Link to="/AddPost" href="/AddPost">
            <Button>Add Post</Button>
          </Link>
        </div>
        <List>
          {props.postsArr.map((post, i) => {
            return (
              <ListItem key={i}>
                <ListItemText primary={post.title} />
              </ListItem>
            );
          })}
        </List>
      </div>
    )
  );
};
