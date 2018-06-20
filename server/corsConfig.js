const whitelist = [
  'http://localhost:3000',
  'http://lambdaface.s3-website.us-west-2.amazonaws.com/',
];

const corsOptions = {
  origin: (origin, callback) => {
    whitelist.find(val => val === origin)
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS.'))
  },
  credentials: true
}