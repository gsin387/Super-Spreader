const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const socketio = require('socket.io');
const loadLobbyEvents = require('./lobbyEventHandler');

const Constants = require('../shared/constants');
const Game = require('./game');
const webpackConfig = require('../../webpack.dev.js');

// Setup an Express server
const app = express();
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
  // Setup Webpack for development
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  // Static serve the dist/ folder in production
  app.use(express.static('dist'));
}

// Listen on port
const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log(`Server listening on port ${port}`);

// Setup socket.io
const io = socketio(server);

// Setup the Game
const game = new Game();

// Listen for socket.io connections
io.on('connection', (socket) => {
  console.log('Player connected!', socket.id);

  loadLobbyEvents(io, socket, game);

  // socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
  socket.on(Constants.MSG_TYPES.INPUT, handleInput);
  socket.on('disconnect', onDisconnect);
  socket.on(Constants.MSG_TYPES.INPUT_SPEED, handleInputSpeed);
});

// function joinGame(username) {
//   game.addPlayer(this, username);
// }

function handleInput(dir) {
  game.handleInput(this, dir);
}

function handleInputSpeed(speed) {
  game.handleInputSpeed(this, speed);
}

function onDisconnect() {
  game.removePlayer(this);
}
