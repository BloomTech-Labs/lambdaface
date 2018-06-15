import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {BrowserRouter as Router, Route, Link } from "react-router-dom";

export default (props) => {
  return (
    // <ul>
    //   <li>
    //     <div>
    //       Hello 
    //     </div>
    //   </li>
    // </ul>
    <Router>
      <List component="nav">
        {props.options.map((category, i) => {
          return <Category key={i} title={category}/>
        })}
      </List>
    </Router>
  )
}

const Category = (props) => {
  return (
    <Link to={`/${props.title.split(' ').join('')}`}>
      <ListItem button>
        <ListItemText primary={props.title} />
      </ListItem>
    </Link>
  )
}