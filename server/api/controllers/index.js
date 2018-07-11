module.exports = {
  ...require('./votes'),
  ...require('./users'),
  ...require('./comments'),
  ...require('./posts'),
  ...require('./follows'),
  ...require('./s3'),
  ...require('./webSockets'),
};
