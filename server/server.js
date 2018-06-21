const express = require('express');
const cors = require('cors');

require('dotenv').config();

// todo properly set up working enviroment ie "development" and "production"
const whitelist = [
  'http://localhost:3000',
  'http://lambdaface.s3-website.us-west-2.amazonaws.com/',
];
const development = true;
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: development 
    ? true
    :(origin, callback) => {
    whitelist.find(val => val === origin)
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS.'))
  },
  credentials: true
}

const routes = require('./api/routes/routes');

const server = express();
server.use(express.json());
server.use(cors(corsOptions));

routes(server);

server.listen(port, () => {
  console.info(`Server listening on Port ${port}`);
});
