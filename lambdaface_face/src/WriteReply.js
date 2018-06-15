import React from 'react';

import axios from 'axios';
import UserBar from './UserBar';

class WriteReply extends React.Component {
  state = {
    content: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submitReply = () => event => {
    const newComment = { content: this.state.content, };
    axios
      .post('http://localhost5000/api/comments', newComment)
      .then(res => {
        // TODO: do something with the response, preferably something useful
        this.setState({ content: '' });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {

    return (
      <form>
        <textarea style={{resize: "none"}} value={this.state.content} onChange={this.handleChange('content')} cols="30" rows="10"></textarea>
        <UserBar type={'writereply'} info={{User: 'rambo'}} submitReply={this.submitReply}/>
      </form>
    );
  };
};

export default WriteReply;
