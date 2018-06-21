const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const socketIo = require('socket.io');

const routes = require('./api/routes/routes');
const corsOptions = require('./corsConfig');

const server = express();

dotenv.config();

// todo properly set up working enviroment ie "development" and "production"

const httpServer = http.Server(server);
const io = socketIo(httpServer);

server.use(express.json());
server.use(cors(corsOptions));

routes(server);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

const port = process.env.PORT || 5000;
httpServer.listen(port, () => {
  console.info(`Server listening on port: ${port}`);
});