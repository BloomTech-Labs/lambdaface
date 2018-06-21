import React from 'react';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';

class Search extends React.Component {
  state = {
    query: '',
    results: [],
  };

  // getResults = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_URL}api/posts/search?=`.concat(`${this.state.query}`))
  //       .then((res) => {
  //         this.setState({ results: res.data})
  //       })
  //       .catch((err) => {
  //         console.log('ERROR', err);
  //       })

  // }

  handleChange = (event) => {
    this.setState({
      query: event.target.value
    });
  };

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.onSubmit([`Search Results for: ${this.state.query}`]);
  // }

  render() {
    return (
      <div className="search">
        {/* <form onSubmit={this.handleSubmit}> */}
        <form onSubmit={this.props.onSubmit([`Search Results for: ${this.state.query}`], null)}>
          <TextField 
            type="text"
            placeholder="Search"
            onChange={this.handleChange}
          />
          <button>Go</button>
        </form>
      </div>
    )
  }
}

export default Search;
