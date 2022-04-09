const Room = require('./room');


jest.useFakeTimers();

describe('Room', () => {
    it('Every room should have 120000 time', () => {
        const room = new Room();
        expect(room.time).toEqual(120000);
      });
    describe('addPlayer', () => {
        it('The first player added should be a host', () => {
            const room = new Room();
            const socket = {
                id: '1234',
                emit: jest.fn(),
                player:{
                    roomID: '1',
                },
              };
              room.addPlayer(socket,'guest1');
            expect(room.host.id).toEqual(socket.id);
          });

          it('Multiple player should be added', () => {
            const room = new Room();
            const socket1 = {
                id: '1234',
                emit: jest.fn(),
                player:{
                    roomID: '1',
                },
              };
              const socket2 = {
                id: '1',
                emit: jest.fn(),
                player:{
                    roomID: '1',
                },
              };
              room.addPlayer(socket1,'guest1');
              room.addPlayer(socket2,'guest2');
            expect(room.players[1]).not.toEqual(undefined);
          });
          it('Number of player should be the number of player added', () => {
            const room = new Room();
            const socket1 = {
                id: '1234',
                emit: jest.fn(),
                player:{
                    roomID: '1',
                },
              };
              const socket2 = {
                id: '1',
                emit: jest.fn(),
                player:{
                    roomID: '1',
                },
              };
              room.addPlayer(socket1,'guest1');
              room.addPlayer(socket2,'guest2');
            expect(room.players[2]).toEqual(undefined);
          });              
    });
    describe('chooseInfectedPlayer', () => {
        it('One of the player should be infected if only one is chosen to be infected randomly', () => {
            const room = new Room();
                const socket1 = {
                    id: '1234',
                    emit: jest.fn(),
                    player:{
                        roomID: '1',
                    },
                };
                const socket2 = {
                    id: '1',
                    emit: jest.fn(),
                    player:{
                        roomID: '1',
                    },
                };
                room.addPlayer(socket1,'guest1');
                room.addPlayer(socket2,'guest2');
                room.chooseInfectedPlayer();
                expect(room.players[1234].infected).not.toEqual(room.players[1].infected);
        });
        
    });
});