import React from 'react';
import axios from 'axios';

import "../Styles/Uploader.css";

class Uploader extends React.Component {
  state = {
    profilePicture: "https://i.stack.imgur.com/34AD2.jpg"
  }
  fileChange = event => {
    let file = event.target.files[0];
    axios.get('http://localhost:5000/s3/sign', {
      params: {
        filename: this.props.userId,
        filetype: file.type
      }
    })
    .then((result) => {
      const signedUrl = result.data;
      const options = {
        headers: {
          'Content-Type': file.type
        }
      }
      axios.put(signedUrl, file, options)
      .then((result) => {
        this.setState({profilePicture: `https://s3-us-west-2.amazonaws.com/lf-photos/photos/${this.props.userId}`});
        console.log(result);
        // axios.put(`http://localhost:5000/api/users/${this.props.userId}`, {
        //   profilePicture: `https://s3-us-west-2.amazonaws.com/lf-photos/${this.props.userId}`
        // })
        // .then((result) => {
        //   console.log(result);
        // })
        // .catch(err => {
        //   console.error(err);
        // })
      })
      .catch((err) => {
        console.error(err);
      })
    })
    .catch((err) => {
      console.error(err);
    })
  };

  render() {
    const imageSize = {
      width: '175px',
      height: '175px',
    };
    return (
      <div className="upload-container">
        <img src={this.state.profilePicture} alt="profilepicture" style={imageSize} className="profile-picture" />
        <input className="inputfile" id="file" name="file" type="file" accept="image/*" onChange={this.fileChange} />
        <label htmlFor="file">Change</label>
      </div>
    );
  }
}

export default Uploader;
