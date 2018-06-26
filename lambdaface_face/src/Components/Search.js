import React from 'react';

// import TextField from '@material-ui/core/TextField';
import SearchIcon from "../Assets/search.svg";
import "../Styles/Search.css";

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
      <div className="search-container">
        <form onSubmit={this.props.onSubmit([`Search Results for: ${this.state.query}`, null])} className="search-form">
          <div className="search-bar">
            <img src={SearchIcon} alt="SearchIcon" />
            <input
              className="search" 
              type="text"
              placeholder="Search"
              onChange={this.handleChange}
            />
          </div>
          <button style={{display: "none"}} disabled={!this.state.query}>Go</button>
        </form>
      </div>
    )
  }
}

export default Search;
