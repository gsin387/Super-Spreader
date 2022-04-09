const Player = require('./player');
const Constants = require('../shared/constants');

describe('Player', () => {
  describe('update', () => {
    it('Player should not move when they enters to the game', () => {
      const player = new Player('1', 'test');
      const playerInitialSpeed = 0;

      player.update(1);

      expect(player.speed).toEqual(playerInitialSpeed);
    });
    it('Player should not enter to wall', () => {
          const player = new Player('1', 'test',0,Constants.MAP_MARGIN+1);
          player.direction = Math.PI/2;
          player.speed = Constants.PLAYER_SPEED;
          var i =0;
            while(i<1000){
                player.update(0.01);
                i++;
            }

            expect(player.x).toEqual(Constants.MAP_MARGIN);
    });    
    it('When player enters to booster zone, player should move faster', () => {
        const player = new Player('1', 'test',Constants.MAP_MARGIN+4*Constants.WALL_WIDTH+1,Constants.MAP_MARGIN+Constants.WALL_WIDTH*4+Constants.BOOSTER_WIDTH+1);
        player.direction = Math.PI/2;
        player.speed = Constants.PLAYER_SPEED;
        var i =0;
        while(i<1000){
            player.update(0.01);
            i++;
        }
        expect(player.speed).toEqual(Constants.PLAYER_SPEED_IN_BOOSTER);
  }); 

  it('When player enters to mud zone, player should move slower', () => {
    const player = new Player('1', 'test',Constants.MAP_MARGIN+8.5*Constants.WALL_WIDTH+1,Constants.MAP_MARGIN+8.5*Constants.WALL_WIDTH+1);
    player.direction = Math.PI/2;
    player.speed = Constants.PLAYER_SPEED;
    var i =0;
    while(i<1000){
        player.update(0.01);
        i++;
    }
    expect(player.speed).toEqual(-1);}); 

  });

  describe('serializeForUpdate', () => {
    it('include infected status and direction in serialization', () => {
      const player = new Player('123', 'guest');

      expect(player.serializeForUpdate())
        .toEqual(expect.objectContaining({
        infected: false,
          direction: expect.any(Number),
        }));

    });



  });


});
