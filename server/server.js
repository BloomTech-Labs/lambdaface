const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// todo properly set up working enviroment ie "development" and "production"

const port = process.env.PORT || 5000;
const routes = require('./api/routes/routes');

const server = express();
server.use(express.json());
server.use(cors(corsOptions));

routes(server);

server.listen(port, () => {
  console.info(`Server listening on Port ${port}`);
});
