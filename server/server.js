const express = require('express');

const port = process.env.PORT || 5000;

const server = express();
server.use(express.json());

server.listen(port, () => {
  console.info(`Server listening on Port ${port}`);
});
