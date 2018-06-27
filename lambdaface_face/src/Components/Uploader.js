import React from 'react';
import axios from 'axios';

import "../Styles/Uploader.css";

class Uploader extends React.Component {
  state = {
    userId: this.props.userId,
    profilePicture: this.props.profilePicture,
  }
  fileChange = event => {
    let file = event.target.files[0];
    axios.get(`${process.env.REACT_APP_URL}`.concat('s3/sign'), {
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
        console.log(result);
        axios.put(`${process.env.REACT_APP_URL}`.concat(`api/users/${this.state.userId}`), {
          profilePicture: `https://s3-us-west-2.amazonaws.com/lf-photos/photos/${this.state.userId}`
        })
        .then((result) => {
          this.setState({profilePicture: `https://s3-us-west-2.amazonaws.com/lf-photos/photos/${this.state.userId}`});
          console.log('Success?', result);
        })
        .catch(err => {
          console.error(err);
        })
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
