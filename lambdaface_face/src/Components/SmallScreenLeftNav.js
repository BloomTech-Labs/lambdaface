import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import LeftNavSVG from "../Assets/LeftNavCategory/LeftNavSVG";

const selectedTextStyle = {
  color: '#508bcf',
}
const rowStyle = {
  height: "25px",
  border: "1px solid #508bcf",
  borderRadius: '25px',
  whiteSpace: "nowrap",
  padding: '10px 0px 10px 10px',
  margin: '6px'
}
const unSelected = {
  color: 'grey'
}
const topStyle = {
  display: 'flex',
  flexDirection: 'row',
  padding: '20px 0 20px 10px',
  flexWrap: 'nowrap',
  overflowX: 'auto',
}

class SmallScreenLeftNav extends React.Component {
  state = {
    currentSelect: this.props.options[0],
  }
  select(category, passed) {
    passed.state.currentSelect = category[0]
  }
  render() {
    return (

      <List component="nav" style={topStyle} className="home-page__small-screen-left-nav-list">
        {this.props.options.map((category, i) => {
          return (
            <ListItem
              style={this.state.currentSelect === category ? rowStyle : Object.assign({}, rowStyle, { border: "1px solid grey" })}
              button
              key={Math.random()}
              onClick={this.props.changeCurrentCategory([category, i], null, this.select, this)}
            >
              <LeftNavSVG image={category} fill={this.state.currentSelect === category ? "#508bcf" : "grey"} />
              <ListItemText
                disableTypography
                style={this.state.currentSelect === category ? selectedTextStyle : unSelected}
                primary={category}
              />
            </ListItem>
          );
        })}
      </List>
    )
  }
}

export default SmallScreenLeftNav;
