const aws = require('aws-sdk');

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const S3_BUCKET = 'lambdaface-photos/photos';

const signS3 = (req, res) => {
  aws.config.update({ accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_KEY, region: 'us-west-2'});

  const s3 = new aws.S3();

  const options = {
    Bucket: S3_BUCKET,
    Key: req.query.filename,
    ContentType: req.query.filetype
    // Expires: 60,
  };

  s3.getSignedUrl('putObject', options, (error, data) => {
    if (error) {
      console.error(error);
      return error;
    } 
    res.json(data);
  })
}

module.exports = {
  signS3,
}