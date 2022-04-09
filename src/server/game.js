const Constants = require('../shared/constants');
const Room = require('./room');
const Player = require('./player');
//const Obstacle = require('./obstacle');
const applyCollisions = require('./collisions');

class Game {
  constructor() {
    this.gameRoomsDict = {};
  }

  newGame() {
    const room = this.createNewLobby();
    this.gameRoomsDict[room.roomID] = room;
    return room.roomID;
  }

  createNewLobby() {
    let room;
    while (!room) {
      room = new Room();
      // Create a new room if a room that has the same ID already exist
      if (this.gameRoomsDict[room.roomID] !== undefined) {
        // Room already exists, create the room again using the loop
        room = null;
      }
    }
    return room;
  }

  existingRoomID(roomID) {
    for (const [key] of Object.entries(this.gameRoomsDict)) {
      if (key === roomID) {
        return true;
      }
    }
    return false;
  }

  handleInput(socket, dir) {
    let roomID = socket.player.roomID;
    if (this.gameRoomsDict[roomID].players[socket.id]) {
      this.gameRoomsDict[roomID].players[socket.id].setDirection(dir);
    }
  }

  handleInputSpeed(socket, speed) {
    let roomID = socket.player.roomID;
    if (this.gameRoomsDict[roomID].players[socket.id]) {
      this.gameRoomsDict[roomID].players[socket.id].setSpeed(speed);
    }
  }

  removePlayer(socket) {
    if (socket.player) {
      let roomID = socket.player.roomID;
      delete this.gameRoomsDict[roomID].sockets[socket.id];
      delete this.gameRoomsDict[roomID].players[socket.id];
    }
  }
}

module.exports = Game;
