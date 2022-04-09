const Game = require('./game');
const Player = require('./player');
const Constants = require('../shared/constants');

/**
 * Event handlers and logic for `create-lobby` and `lobby-code`
 * The goal of these lobby events is to allow a host to create a game and receive a new room id.
 * @param {any} io
 * @param {any} socket
 * @param {Game} game
 */
function createLobby(io, socket, game) {
  socket.on(Constants.MSG_TYPES.CREATE_GAME, (username) => {
    // Create lobby for the session - generate random roomID - dict stores new Lobby
    const roomID = game.newGame();
    // this.players[socket.id] = new Player(socket.id, username, x, y);

    const room = game.gameRoomsDict[roomID];
    room.addPlayer(socket, username);

    // Subscribe to the room events
    socket.join(roomID);

    userNameList = room.getUsernames();

    // Send room ID back to host.
    io.in(roomID).emit('lobby-join', {
      roomID: roomID,
      userNameList: userNameList,
    });
  });
}

/**
 * Event handlers and logic for `join-lobby`
 * The goal of these join events is to allow a player to join a game room and receive a confirmation.
 * @param {any} io
 * @param {any} socket
 * @param {Game} game
 */
function joinLobby(io, socket, game) {
  // on join lobby message event will call join lobby event handler
  socket.on(Constants.MSG_TYPES.JOIN_GAME, (data) => {
    if (data.roomID && game.existingRoomID(data.roomID)) {
      let roomID = data.roomID;
      let username = data.username;
      const room = game.gameRoomsDict[roomID];
      room.addPlayer(socket, data.username);

      // Subscribe to the room events
      socket.join(roomID);

      userNameList = room.getUsernames();

      io.in(socket.player.roomID).emit('lobby-join', {
        roomID: roomID,
        userNameList: userNameList,
        noRoom: false,
      });
    } else {
      socket.emit('lobby-join', {
        roomID: 0,
        userNameList: null,
        noRoom: true,
      });
    }
  });
}

function startGame(io, socket, game) {
  socket.on('gameStartClicked', () => {
    const room = game.gameRoomsDict[socket.player.roomID];
    roomID = socket.player.roomID;
    room.startTimer();
    var infectedSocket = room.chooseInfectedPlayer();
    io.in(roomID).emit('gameStart');
    infectedSocket.emit('infected');
  });
}

/**
 * Event handlers and logic for all of the lobby-related event
 * Current namespaces: create-lobby, lobby-code, reset-lobby, reset-lobby-update
 * @param {any} io
 * @param {any} socket
 * @param {Game} mafiaGame
 */
module.exports = function (io, socket, game) {
  createLobby(io, socket, game);
  joinLobby(io, socket, game);
  startGame(io, socket, game);
};
