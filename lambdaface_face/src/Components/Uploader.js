import Dropzone from 'react-dropzone';
import React from 'react';
import axios from 'axios';

class Uploader extends React.Component {
  onDrop = (files) => {
    let file = files[0];
    axios.get('http://localhost:5000/s3/sign', {
      params: {
        filename: file.name,
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
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
      </section>
    );
  }
}

export default Uploader;
