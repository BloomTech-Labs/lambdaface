import React from 'react';

import TextField from '@material-ui/core/TextField';

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
      <div className="search">
        <form onSubmit={this.props.onSubmit([`Search Results for: ${this.state.query}`], null)}>
          <TextField 
            type="text"
            placeholder="Search"
            onChange={this.handleChange}
          />
          <button disabled={!this.state.query}>Go</button>
        </form>
      </div>
    )
  }
}

export default Search;
