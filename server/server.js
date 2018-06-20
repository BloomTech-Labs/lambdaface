const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const routes = require('./api/routes/routes');
const corsOptions = require('./corsConfig');

dotenv.config();

const server = express();
const port = process.env.PORT || 5000;

// todo properly set up working enviroment ie "development" and "production"

server.use(express.json());
server.use(cors(corsOptions));

routes(server);

server.listen(port, () => {
  console.info(`Server listening on port: ${port}`);
});
