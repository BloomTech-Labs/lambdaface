const aws = require('aws-sdk');

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const S3_BUCKET = 'lambdaface-photos';


const signS3 = (req, res) => {
  aws.config.update({ accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_KEY, region: 'us-west-2'});

  const s3 = new aws.S3();

  const options = {
    Bucket: S3_BUCKET,
    Key: req.query.filename,
    // Expires: 60,
    ContentType: req.query.filetype
  };

  s3.getSignedUrl('putObject', options, (err, data) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      res.json(data);
    }
  })
}

module.exports = {
  signS3,
}