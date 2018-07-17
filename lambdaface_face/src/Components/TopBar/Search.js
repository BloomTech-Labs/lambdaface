import React from 'react';

// import TextField from '@material-ui/core/TextField';
import SearchIcon from "../../Assets/search.svg";

class Search extends React.Component {
  state = {
    query: '',
    displaySearchField: false,
  };

  handleChange = event => {
    this.setState({
      query: event.target.value,
    });
  };

  toggleSearchField = () => {
    this.setState(prev => ({ displaySearchField: !prev.displaySearchField }));
  }

  render() {
    return (
      <div>
        <div className="top-bar__big-search">
          <form onSubmit={this.props.onSubmit([`Search Results For: ${this.state.query}`, null])}>
            <img src={SearchIcon} alt="SearchIcon" className="top-bar__search-icon" />
            <input
              className="top-bar__search-input"
              type="text"
              placeholder="Search"
              onChange={this.handleChange}
            />
            <button style={{display: "none"}} disabled={!this.state.query}>Go</button>
          </form>
        </div>
        <div className="top-bar__smol-search">
          <button className="top-bar__search-icon" onClick={this.toggleSearchField}>
            <img src={SearchIcon} alt="SearchIcon" />
          </button>
          {this.state.displaySearchField ? 
            <div>
              <form onSubmit={this.props.onSubmit([`Search Results For: ${this.state.query}`, null])}>
                <div>
                  <input
                    className="top-bar__dropdown-search-input"
                    type="text"
                    placeholder="Search"
                    onChange={this.handleChange} 
                  />  
                </div>
              </form>
            </div>
              : null
          }
        </div>
      </div>
    )
  }
}

export default Search;
