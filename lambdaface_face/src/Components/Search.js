import React from 'react';

import TextField from '@material-ui/core/TextField';
import SearchIcon from "../Assets/search.svg";

class Search extends React.Component {
  state = {
    query: '',
  };

  handleChange = (event) => {
    this.setState({
      query: event.target.value
    });
  };

  render() {
    return (
      <div className="top-bar__search">
        <form onSubmit={this.props.onSubmit([`Search Results for: ${this.state.query}`, null])}>
          <img src={SearchIcon} alt="SearchIcon" />
          <TextField 
            type="text"
            placeholder="Search"
            onChange={this.handleChange}
          />
          <button style={{display: "none"}} disabled={!this.state.query}>Go</button>
        </form>
      </div>
    )
  }
}

export default Search;
