const Constants = require('../shared/constants');
const Player = require('./player');
const applyCollisions = require('./collisions');
class Room {
  constructor() {
    this.roomID = this.generateRandomID();
    this.sockets = {};
    this.players = {};
    this.time = 120000;
    this.host = null;
    this.lastUpdateTime = Date.now();
    this.shouldSendUpdate = false;
    setInterval(this.update.bind(this), 1000 / 60);
  }

  addPlayer(socket, username) {
    this.sockets[socket.id] = socket;

    // Generate a position to start this player at.
    var x = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    var y = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);

    while (!(this.validStartPosition(x,y))){
      // Re-generate a position to start this player at.
      x = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
      y = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);    
    }


    let player = new Player(socket.id, username, x, y);
    if (this.host == null) {
      this.host = player;
      player.isHost = true;
    }
    socket.player = player;
    player.roomID = this.roomID;
    this.players[socket.id] = player;
  }

  //check whether the position is a valid place to be start
  validStartPosition(x,y){
    //wall c 
    if(y>Constants.MAP_MARGIN && y<Constants.MAP_MARGIN + Constants.WALL_WIDTH*5){
      if(x>Constants.MAP_MARGIN && x < Constants.MAP_MARGIN +3*Constants.WALL_WIDTH){
        return false;
      }
      //wall 19
      if(x>Constants.MAP_MARGIN+Constants.BOOSTER_WIDTH+5*Constants.WALL_WIDTH && x < Constants.MAP_MARGIN + 10*Constants.WALL_WIDTH+Constants.BOOSTER_WIDTH){
        return false;
      }      
    }
    if(y>Constants.MAP_MARGIN+7*Constants.WALL_WIDTH && y<Constants.MAP_MARGIN+8*Constants.WALL_WIDTH){
      // wall for eyes
      if(x>Constants.MAP_MARGIN+3*Constants.WALL_WIDTH && x < Constants.MAP_MARGIN+7*Constants.WALL_WIDTH){
        return false;
      }  
    }
    if(y>Constants.MAP_MARGIN+9*Constants.WALL_WIDTH && y<Constants.MAP_MARGIN+13*Constants.WALL_WIDTH){
      // wall for right small wall
      if(x>Constants.MAP_MARGIN+12*Constants.WALL_WIDTH && x < Constants.MAP_MARGIN+13*Constants.WALL_WIDTH){
        return false;
      }  
    }
    return true;
  }


  getUsernames() {
    let userNames = [];

    for (const [key, value] of Object.entries(this.players)) {
      userNames.push(value.username);
    }
    return userNames;
  }

  generateRandomID() {
    return Math.random().toString(36).substring(7);
  }

  chooseInfectedPlayer() {
    let array = Object.keys(this.players);
    let max = array.length;
    let min = 0;
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    this.players[array[random]].setInitialInfected();
    return this.sockets[this.players[array[random]].id];
  }

  startTimer() {
    setInterval(this.updateTime.bind(this), 1000 / 60);
  }

  updateTime() {
    this.time = Math.floor(this.time - 1000 / 60);

    var minutes = Math.floor((this.time % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((this.time % (1000 * 60)) / 1000);

    var countDown = minutes + 'm ' + seconds + 's ';

    Object.keys(this.sockets).forEach((playerID) => {
      const socket = this.sockets[playerID];
      if (this.time <= 0) {
        this.gameOver();
      } else {
        socket.emit('countdown', countDown);
      }
    });
  }

  update() {
    // Calculate time elapsed
    const now = Date.now();
    const dt = (now - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = now;

    // Update each player
    Object.keys(this.sockets).forEach((playerID) => {
      const player = this.players[playerID];
      player.update(dt);
    });

    var numOfPlayers = 0;
    var numOfInfected = 0;
    Object.keys(this.sockets).forEach((playerID) => {
      const socket = this.sockets[playerID];
      const player = this.players[playerID];
      numOfPlayers++;
      if (player.infected) {
        numOfInfected++;
      }
    });

    const infectedPlayers = applyCollisions(Object.values(this.players));
    infectedPlayers.forEach((p) => {
      numOfInfected++;
      const socket = this.sockets[p.id];
      if (numOfInfected == numOfPlayers) {
        this.gameOver();
      } else {
        socket.emit('infected');
      }
    });

    // Send a game update to each player every other time
    if (this.shouldSendUpdate) {
      Object.keys(this.sockets).forEach((playerID) => {
        const socket = this.sockets[playerID];
        const player = this.players[playerID];
        socket.emit(Constants.MSG_TYPES.GAME_UPDATE, this.createUpdate(player));
        //socket.emit('testSocket', player.direction);
      });
      this.shouldSendUpdate = false;
    } else {
      this.shouldSendUpdate = true;
    }
  }

  createUpdate(player) {
    const nearbyPlayers = Object.values(this.players).filter(
      (p) => p !== player && p.distanceTo(player) <= Constants.MAP_SIZE / 2
    );

    return {
      t: Date.now(),
      me: player.serializeForUpdate(),
      others: nearbyPlayers.map((p) => p.serializeForUpdate()),
    };
  }

  gameOver() {
    Object.keys(this.sockets).forEach((playerID) => {
      const socket = this.sockets[playerID];
      const player = this.players[playerID];
      if(this.time <= 0 && !(this.gameStopped)){
        if(player.infected){
          socket.emit('timeout', 'You Lose');
        }else{
          socket.emit('timeout', 'You Win');
        }
      }else if(!(this.gameStopped)){
        if(player.initialInfected){
          socket.emit('timeout', 'You Win');
        }else{
          socket.emit('timeout', 'You Lose');
        }
      }
    });
    this.gameStopped = true;
  }
}
module.exports = Room;
