const Constants = require('../shared/constants');

// Returns an array of bullets to be destroyed.
function applyCollisions(players) {
  const infectedPlayers = [];
  
  for (let i = 0; i < players.length; i++) {
    const playerA = players[i];
    // Look for a player (who didn't create the bullet) to collide each bullet with.
    // As soon as we find one, break out of the loop to prevent double counting a bullet.
    for (let j = 0; j < players.length; j++) {
       
      const playerB = players[j];
      if (
        i != j &&
        playerB.distanceTo(playerA) <= Constants.PLAYER_RADIUS*2
      ) {
        //!!!!!!!! INFECT PLAYER TODO: !!!!!!!!!!!
        if (playerA.infected && !playerB.infected){
          playerB.setInfected();
          infectedPlayers.push(playerB);

        } else if (playerB.infected && !playerA.infected){
          playerA.setInfected();
          infectedPlayers.push(playerA);
        }
        //break;
      }
    }
  }
  // !!!!!!!! return infected players?
  return infectedPlayers;
}

module.exports = applyCollisions;
