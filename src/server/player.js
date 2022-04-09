const ObjectClass = require('./object');
const Constants = require('../shared/constants');
const constants = require('../shared/constants');

class Player extends ObjectClass {
  constructor(id, username, x, y) {
    super(id, x, y, Math.random() * 2 * Math.PI, 0);
    this.username = username;
    this.isHost = false;
    this.roomID = 0;
    this.infected = false;
    this.initialInfected = false;
    this.initialiseInfectedTest();
    this.image = 'undefined';
    this.setImage();
  }

  initialiseInfectedTest() {
    if (this.username == 'infected') {
      this.setInfected();
    }
  }

  setImage(){
    if(this.image == 'undefined'){
      var rand = Math.floor(Math.random()*(5))
      switch(rand) {
        case 0 :
          this.image = 'man1.png';
          break;
        case 1 :
          this.image = 'businessman.png';
          break;
        case 2 :
          this.image = 'man2.png';
          break;
        case 3 :
          this.image = 'punk-man.png';
          break;
        case 4 :
        this.image = 'women1.png';
          break;
        default:
          this.image = 'man1.png'

      }
    }
  }

  createWallMin(pos,boundaries){
    if(pos <= boundaries + Constants.PLAYER_RADIUS){
      return Math.min(pos, boundaries);
    } else{
      return pos;
    }
  }
  createWallMax(pos,boundaries){
    if(pos >= boundaries - Constants.PLAYER_RADIUS){
     return Math.max(pos, boundaries);
    } else{
      return pos;
    }
  }
  createBoosterZone(x,y,xPos,yPos,xWidth,ywidth){
    if(x>xPos && x <xPos+ xWidth && y > yPos && y< yPos + ywidth){
      return true;
    } else{
      return false;
    }
  }


  // Returns a newly created bullet, or null.
  update(dt) {
    super.update(dt);
    // Make sure the player stays in bounds
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));




    //make sure the player cannot enter to the walls

    //block x axis in wall at C 19 -5
    if(this.y > Constants.MAP_MARGIN && this. y < Constants.MAP_MARGIN + Constants.WALL_WIDTH*5){
      //c left
       this.x = this.createWallMin(this.x,Constants.MAP_MARGIN)
      // 1 left
      this.x = this.createWallMin(this.x,Constants.MAP_MARGIN+5*Constants.WALL_WIDTH+Constants.BOOSTER_WIDTH)
      //1 right
      this.x = this.createWallMax(this.x,Constants.MAP_MARGIN + 6*Constants.WALL_WIDTH + Constants.BOOSTER_WIDTH); 
      //9 right
      this.x = this.createWallMax(this.x,Constants.MAP_MARGIN + Constants.WALL_WIDTH*10 + Constants.BOOSTER_WIDTH);
    }
    if(this.y > Constants.MAP_MARGIN + Constants.PLAYER_RADIUS && this. y < Constants.MAP_MARGIN + Constants.WALL_WIDTH*5 - Constants.PLAYER_RADIUS){
      //c right
      this.x = this.createWallMax(this.x,Constants.MAP_MARGIN + Constants.WALL_WIDTH);
    }
    //block x axis in wall at C one
    if(this.y > Constants.MAP_MARGIN && this.y<Constants.MAP_MARGIN+Constants.WALL_WIDTH){
      this.x = this.createWallMax(this.x,Constants.MAP_MARGIN + Constants.WALL_WIDTH*3);
    }
    //block x axis in wall at C three
    if(this.y > Constants.MAP_MARGIN+Constants.WALL_WIDTH*4 && this.y<Constants.MAP_MARGIN+Constants.WALL_WIDTH*5){
      this.x = this.createWallMax(this.x,Constants.MAP_MARGIN + Constants.WALL_WIDTH*3);
    }
    //block y axis in wall at C -3
    if(this.x > Constants.MAP_MARGIN && this.x < Constants.MAP_MARGIN + Constants.WALL_WIDTH*3){
      //c up
      this.y = this.createWallMin(this.y,Constants.MAP_MARGIN);
      //c down
      this.y = this.createWallMax(this.y,Constants.MAP_MARGIN+5*Constants.WALL_WIDTH);
      //c up - 2
      this.y = this.createWallMin(this.y,Constants.MAP_MARGIN+ Constants.WALL_WIDTH*4);
      //c down - 2
      this.y = this.createWallMax(this.y, Constants.MAP_MARGIN+Constants.WALL_WIDTH);
    }
    //block y axis in wall at 1
    if(this.x > Constants.MAP_MARGIN+Constants.WALL_WIDTH*5+Constants.BOOSTER_WIDTH && this.x < Constants.MAP_MARGIN+Constants.WALL_WIDTH*6+Constants.BOOSTER_WIDTH){
      //1 up
      this.y = this.createWallMin(this.y, Constants.MAP_MARGIN);
      //1 down
      this.y = this.createWallMax(this.y, Constants.MAP_MARGIN+5*Constants.WALL_WIDTH);
    }
    //block y axis in wall at 9
    if(this.x > Constants.MAP_MARGIN+Constants.WALL_WIDTH*7+Constants.BOOSTER_WIDTH*2 && this.x < Constants.MAP_MARGIN+Constants.WALL_WIDTH*10+Constants.BOOSTER_WIDTH){
      //9 up
      this.y = this.createWallMin(this.y, Constants.MAP_MARGIN);
    }
    if(this.x > Constants.MAP_MARGIN+Constants.WALL_WIDTH*9+Constants.BOOSTER_WIDTH && this.x < Constants.MAP_MARGIN+Constants.WALL_WIDTH*10+Constants.BOOSTER_WIDTH){
      //9 down
      this.y =this.createWallMax(this.y, Constants.MAP_MARGIN+5*Constants.WALL_WIDTH);
    }
    if(this.x > Constants.MAP_MARGIN+Constants.WALL_WIDTH*7+Constants.BOOSTER_WIDTH*2 && this.x < Constants.MAP_MARGIN+Constants.WALL_WIDTH*10){
      //9 down - 2
      this.y = this.createWallMax(this.y, Constants.MAP_MARGIN+2*Constants.WALL_WIDTH+Constants.BOOSTER_WIDTH );
    }    
    //block x axis in wall at 9
    if(this.y > Constants.MAP_MARGIN && this. y < Constants.MAP_MARGIN + Constants.WALL_WIDTH*2.5){
      //9 left - top
      this.x = this.createWallMin(this.x,Constants.MAP_MARGIN+Constants.WALL_WIDTH*7+Constants.BOOSTER_WIDTH*2);
    }
    if(this.y > Constants.MAP_MARGIN+ Constants.WALL_WIDTH && this. y < Constants.MAP_MARGIN + Constants.WALL_WIDTH*5){
      //9 left - bottom
      this.x = this.createWallMin(this.x,Constants.MAP_MARGIN + 9*Constants.WALL_WIDTH + Constants.BOOSTER_WIDTH);
    }
    //left eyes wall north side bound (y axis)
    if(this.x > Constants.MAP_MARGIN + Constants.WALL_WIDTH*3 && this.x < Constants.MAP_MARGIN + Constants.WALL_WIDTH*4 ){
      this.y = this.createWallMin(this.y, Constants.MAP_MARGIN + Constants.WALL_WIDTH * 7);  
      //left eyes wall south side bound (y axis)
      this.y = this.createWallMax(this.y, Constants.MAP_MARGIN + Constants.WALL_WIDTH * 8);  
    }
    //right eyes wall north side bound (y axis)
    if(this.x > Constants.MAP_MARGIN + Constants.WALL_WIDTH*6 && this.x < Constants.MAP_MARGIN + Constants.WALL_WIDTH*7){
      this.y = this.createWallMin(this.y, Constants.MAP_MARGIN + Constants.WALL_WIDTH * 7); 
      //right eyes wall south side bound (y axis)
      this.y = this.createWallMax(this.y, Constants.MAP_MARGIN + Constants.WALL_WIDTH * 8);  
    } 
    //x axis boundaries
    if(this.y > Constants.MAP_MARGIN+Constants.WALL_WIDTH*7 && this.y < Constants.MAP_MARGIN+Constants.WALL_WIDTH*8){
      //left eyes east side
      this.x = this.createWallMin(this.x,Constants.MAP_MARGIN + Constants.WALL_WIDTH*3);
      //right eyes wall east side
      this.x = this.createWallMin(this.x,Constants.MAP_MARGIN + Constants.WALL_WIDTH*6);
      //left eyes west side
      this.x = this.createWallMax(this.x,Constants.MAP_MARGIN + Constants.WALL_WIDTH*4);
      //right eyes wall west side
      this.x = this.createWallMax(this.x,Constants.MAP_MARGIN + Constants.WALL_WIDTH*7);
    }
    //right corner wall
    //wall for east and west
    if(this.y > Constants.MAP_MARGIN+Constants.WALL_WIDTH*9 && this.y < Constants.MAP_MARGIN+Constants.WALL_WIDTH*13){
      this.x = this.createWallMin(this.x, Constants.MAP_MARGIN+12*Constants.WALL_WIDTH);
      this.x = this.createWallMax(this.x, Constants.MAP_MARGIN+13*Constants.WALL_WIDTH);
    }
    //wall for north and south
    if(this.x >Constants.MAP_MARGIN+12*Constants.WALL_WIDTH && this.x <Constants.MAP_MARGIN+13*Constants.WALL_WIDTH){
      this.y = this.createWallMin(this.y, Constants.MAP_MARGIN+Constants.WALL_WIDTH*9);
      this.y = this.createWallMax(this.y, Constants.MAP_MARGIN+Constants.WALL_WIDTH*13);
    }

    //----------------------------------------------//
    //booster zone
    
    if(this.createBoosterZone(this.x,this.y,Constants.MAP_MARGIN+4*Constants.WALL_WIDTH,Constants.MAP_MARGIN+Constants.WALL_WIDTH*4+Constants.BOOSTER_WIDTH,Constants.BOOSTER_WIDTH,Constants.BOOSTER_WIDTH)){
      this.setSpeed(Constants.PLAYER_SPEED_IN_BOOSTER);
    }
    if(this.createBoosterZone(this.x,this.y,Constants.MAP_SIZE-2*Constants.BOOSTER_WIDTH,Constants.MAP_MARGIN-Constants.BOOSTER_WIDTH,Constants.BOOSTER_WIDTH,Constants.BOOSTER_WIDTH*7)){
      this.setSpeed(Constants.PLAYER_SPEED_IN_BOOSTER);
    }
    if(this.createBoosterZone(this.x,this.y,Constants.MAP_MARGIN+3.5*Constants.WALL_WIDTH,Constants.MAP_MARGIN+Constants.WALL_WIDTH*10,Constants.WALL_WIDTH*3,Constants.BOOSTER_WIDTH)){
      this.setSpeed(Constants.PLAYER_SPEED_IN_BOOSTER);
    }
    if(this.createBoosterZone(this.x,this.y,Constants.MAP_MARGIN,Constants.MAP_MARGIN+Constants.WALL_WIDTH*11,Constants.BOOSTER_WIDTH,Constants.BOOSTER_WIDTH*4)){
      this.setSpeed(Constants.PLAYER_SPEED_IN_BOOSTER);
    }
    if(this.createBoosterZone(this.x,this.y,Constants.MAP_MARGIN+8.5*Constants.WALL_WIDTH,Constants.MAP_MARGIN+Constants.WALL_WIDTH*8.5,Constants.WALL_WIDTH*2,Constants.WALL_WIDTH*2.5)){
      this.setSpeed(-1);
    }
    return null;
  }

  setInfected() {
    this.infected = true;
  }

  setInitialInfected() {
    this.initialInfected = true;
    this.infected = true;
  }

  serializeForUpdate() {
    return {
      ...super.serializeForUpdate(),
      direction: this.direction,
      infected: this.infected,
      image: this.image,
    };
  }
}

module.exports = Player;
