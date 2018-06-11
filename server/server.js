const express = require('express');

const port = process.env.PORT || 5000;

const server = express();
server.use(express.json());

var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : '127.0.0.1',
    user : 'admin',
    password : 'admin',
    database : 'LambdaFace'
  }
});

server.listen(port, () => {
  console.info(`Server listening on Port ${port}`);
});
