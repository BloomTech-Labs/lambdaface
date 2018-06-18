const express = require('express');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 5000;
const corsOptions = {
  origin: 'http://localhost:3000',
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
