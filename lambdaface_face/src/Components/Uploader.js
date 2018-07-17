import React from 'react';
import axios from 'axios';

// import "../Styles/Uploader.css";

class Uploader extends React.Component {
  state = {
    userId: this.props.userId,
    profilePicture: this.props.profilePicture,
    imageHash: this.props.imageHash,
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
        this.props.updateImageHash()
        axios.put(`${process.env.REACT_APP_URL}`.concat(`api/users/${this.state.userId}`), {
          profilePicture: `https://s3-us-west-2.amazonaws.com/lambdaface-photos/photos/${this.state.userId}`
        })
        .then((result) => {
          this.props.updatePic();
          this.setState({imageHash: Date.now()});
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
      <div className="uploader__container">

        <img
          src={`${this.state.profilePicture}?${this.state.imageHash}`}
          alt="profilepicture"
          style={imageSize}
          className="uploader__picture"
        />

        <input 
          className="uploader__inputfile"
          id="file"
          name="file"
          type="file"
          accept="image/*"
          onChange={this.fileChange}
        />

        <label htmlFor="file" className="uploader__label">Change</label>
      </div>
    );
  }
}

export default Uploader;
