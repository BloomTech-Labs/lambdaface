const express = require('express');

const port = process.env.PORT || 5000;

const routes = require('./api/routes/routes');

const server = express();
server.use(express.json());

routes(server);

server.listen(port, () => {
  console.info(`Server listening on Port ${port}`);
});
