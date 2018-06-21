import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import UserBar from "./PostPage/UserBar";
import "../Styles/PostList.css";

// export default props => {
//   return (
//     props.category && (
//       <div>
//         <div>
//           <h1>{props.category[0]}</h1>
//           <Button onClick={props.changeCurrentCategory(["AddPost", null])}>
//             Add Post
//           </Button>
//         </div>
//         <List>
//           {props.postsArr.map((post, i) => {
//             return (
//               <ListItem
//                 className="postList__listItem"
//                 style={{ alignItems: "flex-start" }}
//                 key={post.id}
//                 onClick={props.changeCurrentCategory(["PostPage", null], post)}
//               >
//                 <ListItemText className="listItem__top" primary={post.title} />
//                 <UserBar className="listItem__bottom" info={post} type="allposts" />
//               </ListItem>
//             );
//           })}
//         </List>
//       </div>
//     )
//   );
// };

class SearchResults extends React.Component{
  render(){
    const props = this.props;
    return (
      <List>
        {props.results.map((post, i) => {
          return (
            <ListItem
              className="postList__listIem"
              style={{ alignItems: "flex-start" }}
              key={post.id}
              onClick={props.changeCurrentCategory(["PostPage", null], post)}
            >
              <ListItemText className="listItem__top" primary={post.title} />
              <UserBar className="listItem__bottom" info={post} type="allposts" />
            </ListItem>
          )
        })}
      </List>
    )
  }
}
export default SearchResults;