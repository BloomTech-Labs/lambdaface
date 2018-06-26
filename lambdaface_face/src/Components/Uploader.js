import React from 'react';
import axios from 'axios';

import "../Styles/Uploader.css";

class Uploader extends React.Component {
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
        console.log(result);
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
    return (
      <section>
        <div>
          <input className="inputfile" id="file" name="file" type="file" accept="image/*" onChange={this.fileChange} />
          <label htmlFor="file">Change</label>
        </div>
      </section>
    );
  }
}

export default Uploader;
