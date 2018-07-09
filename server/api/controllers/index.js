module.exports = {
  ...require('./votes'),
  ...require('./users'),
  ...require('./comments'),
  ...require('./posts'),
  ...require('./s3'),
  ...require('./webSockets'),
};
