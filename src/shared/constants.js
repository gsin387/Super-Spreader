module.exports = Object.freeze({
  PLAYER_RADIUS: 20,
  PLAYER_SPEED: 300,
  //400 if booster can go through wall
  PLAYER_SPEED_IN_BOOSTER: 600,
  //1600
  SCORE_PER_SECOND: 1,

  MAP_MARGIN: 150,
  WALL_WIDTH: 100,
  BOOSTER_WIDTH: 50,

  MAP_SIZE: 1500,
  BUILDING_SIZE: 350,
  BUSH_SIZE: 150,

  MSG_TYPES: {
    CREATE_GAME: 'create_game',
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    GAME_OVER: 'dead',
    INPUT_SPEED: 'speed',
  },
});
