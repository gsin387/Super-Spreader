const Game = require('./game');
const Constants = require('../shared/constants');
const Room = require('./room');
const Player = require('./player');

jest.useFakeTimers();

describe('Game', () => {
    describe('newGame', () => {
        it('Creating new game should create a room, not undefined', () => {
            const game = new Game();
            const roomID =game.newGame();
            expect(roomID).not.toEqual(null);
          });
    });
    describe('handleInput', () => {
        it('should update the direction of a player in room', () => {
            const game = new Game();
            const socket = {
                id: '1234',
                emit: jest.fn(),
                player:{
                    roomID: '1',
                },
              };
            const room = new Room();
            room.sockets[socket.id] = socket.id;
            const player = new Player();
            room.players[socket.id] = player;
            game.gameRoomsDict['1'] = room;
            game.handleInput(socket, 2)
            expect(2).toEqual(game.gameRoomsDict['1'].players[socket.id].direction);
          });
    });
    describe('handleInputSpeed', () => {
        it('should update the speed of a player in room', () => {
            const game = new Game();
            const socket = {
                id: '1234',
                emit: jest.fn(),
                player:{
                    roomID: '1',
                },
              };
            const room = new Room();
            room.sockets[socket.id] = socket.id;
            const player = new Player();
            room.players[socket.id] = player;
            game.gameRoomsDict['1'] = room;
            game.handleInputSpeed(socket, 21)
            expect(21).toEqual(game.gameRoomsDict['1'].players[socket.id].speed);
          });
    });
    describe('removePlayer', () => {
        it('should remove a player in the room', () => {
            const game = new Game();
            const socket = {
                id: '1234',
                emit: jest.fn(),
                player:{
                    roomID: '1',
                },
              };
            const room = new Room();
            room.sockets[socket.id] = socket.id;
            const player = new Player();
            room.players[socket.id] = player;
            game.gameRoomsDict['1'] = room;
            game.removePlayer(socket)
            expect(undefined).toEqual(game.gameRoomsDict['1'].players[socket.id]);
          });
    });
});