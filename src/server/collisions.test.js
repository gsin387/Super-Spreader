const applyCollisions = require('./collisions');
const Constants = require('../shared/constants');
const Player = require('./player');

describe('applyCollisions', () => {
  it('collision between infected and uninfected players cause uninfected player to be infected', () => {
    const players = [
      new Player('1', 'guest1', 1, 1),
      new Player('2', 'guest2', 10, 10),
    ];
    players[0].infected = true;
    players[1].infected = false;


    const result = applyCollisions(players);
    expect(result).toHaveLength(1);
  });
  it('if there are no collision between player 1 and player 2, nothing is changed', () => {
    const players = [
      new Player('1', 'guest1', 1, 1),
      new Player('2', 'guest2', 100, 100),
    ];
    players[0].infected = true;
    players[1].infected = false;


    const result = applyCollisions(players);
    expect(result).toHaveLength(0);
  });
});