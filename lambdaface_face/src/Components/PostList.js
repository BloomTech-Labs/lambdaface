import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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

export default (props) => {
  return (
    <List>
      {props.postsArr.map((post, i) => {
        return (
          <ListItem key={i}>
            <ListItemText primary={post.title}/>
          </ListItem>
        )
      })}
    </List>
  )
}