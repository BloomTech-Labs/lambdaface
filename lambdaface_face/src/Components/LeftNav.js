import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import LeftNavSVG from "../Assets/LeftNavCategory/LeftNavSVG";

const selectedTextStyle =  {
  color: '#508bcf',
}
const unSelected = {
}

class LeftNav extends React.Component {
  state = {
   currentSelect: this.props.options[0],
  }
  select(category, passed) {
    passed.state.currentSelect = category[0]
  }
  render() {
    return(
      <List component="nav" className="category-list">
        {this.props.options.map((category, i) => {
        return (
          <ListItem
            style={this.state.currentSelect === category ? {height: "50px", borderLeft: "4px solid #508bcf",}: {height:"50px", borderLeft: "4px solid white"}}
            button
            key={Math.random()}
            onClick={this.props.changeCurrentCategory([category, i], null, this.select, this)}
          >
            <LeftNavSVG image={category} fill={this.state.currentSelect === category? "#508bcf" : "rgb(44,46,49)"} />
            <ListItemText 
              disableTypography 
              style={this.state.currentSelect === category ? selectedTextStyle: unSelected} 
              primary={category}
            />
          </ListItem>
        );
      })}
      </List>
    )
  }
}

export default LeftNav;
