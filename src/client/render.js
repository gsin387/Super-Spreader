import { debounce } from 'throttle-debounce';
import Player from '../server/player';

import { getAsset } from './assets';
import { getCurrentState } from './state';

const Constants = require('../shared/constants');

const { PLAYER_RADIUS, MAP_SIZE,MAP_MARGIN,WALL_WIDTH,BOOSTER_WIDTH} = Constants;

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
setCanvasDimensions();

function setCanvasDimensions() {
  // On small screens (e.g. phones), we want to "zoom out" so players can still see at least
  // 800 in-game units of width.
  const scaleRatio = Math.max(1, 800 / window.innerWidth);
  canvas.width = scaleRatio * window.innerWidth;
  canvas.height = scaleRatio * window.innerHeight;
}

window.addEventListener('resize', debounce(40, setCanvasDimensions));

function render() {
  const { me, others} = getCurrentState();
  if (!me) {
    return;
  }

  // Draw background
  renderBackground(me.x, me.y);

  // Draw boundaries
  context.strokeStyle = 'black';
  context.lineWidth = 5;
  context.strokeRect(canvas.width / 2 - me.x, canvas.height / 2 - me.y, MAP_SIZE, MAP_SIZE);

  //Obstacles - wall
  var xAxis = canvas.width/2 -me.x;
  var yAxis = canvas.height/2 - me.y;

  //x position start,     y position start,     x width,      y height

  //c
  context.drawImage(getAsset('wall.jpg'),xAxis+MAP_MARGIN,yAxis +MAP_MARGIN,3*WALL_WIDTH,WALL_WIDTH);
  context.drawImage(getAsset('wall.jpg'),xAxis+MAP_MARGIN, yAxis+MAP_MARGIN+WALL_WIDTH,WALL_WIDTH,3*WALL_WIDTH);
  context.drawImage(getAsset('wall.jpg'),xAxis+MAP_MARGIN, yAxis+MAP_MARGIN+WALL_WIDTH*4,WALL_WIDTH*3,WALL_WIDTH);

  //1
  context.drawImage(getAsset('wall.jpg'),xAxis+MAP_MARGIN+5*WALL_WIDTH+BOOSTER_WIDTH, yAxis+MAP_MARGIN,WALL_WIDTH,5*WALL_WIDTH);

  //9
  context.drawImage(getAsset('wall.jpg'),xAxis+MAP_MARGIN+7*WALL_WIDTH+BOOSTER_WIDTH*2, yAxis+MAP_MARGIN,2.5*WALL_WIDTH,2.5*WALL_WIDTH);
  context.drawImage(getAsset('wall.jpg'),xAxis+MAP_MARGIN+9*WALL_WIDTH+BOOSTER_WIDTH,yAxis +MAP_MARGIN+2.5*WALL_WIDTH,WALL_WIDTH,WALL_WIDTH*2.5);

  //left eye
  context.drawImage(getAsset('wall.jpg'),xAxis+MAP_MARGIN+3*WALL_WIDTH, yAxis+MAP_MARGIN+WALL_WIDTH*7,WALL_WIDTH,WALL_WIDTH);
  //right eye
  context.drawImage(getAsset('wall.jpg'),xAxis+MAP_MARGIN+6*WALL_WIDTH, yAxis+MAP_MARGIN+WALL_WIDTH*7,WALL_WIDTH,WALL_WIDTH);

  //right small wall
  context.drawImage(getAsset('wall.jpg'),xAxis+MAP_MARGIN+12*WALL_WIDTH, yAxis+MAP_MARGIN+WALL_WIDTH*9,WALL_WIDTH,WALL_WIDTH*4);


  //booster zone
  //point
  context.drawImage(getAsset('boosterZoneFaster.png'),xAxis+MAP_MARGIN+4*WALL_WIDTH,yAxis+MAP_MARGIN+WALL_WIDTH*4+BOOSTER_WIDTH,BOOSTER_WIDTH,BOOSTER_WIDTH);
  //right corner
  context.drawImage(getAsset('boosterZoneFaster.png'),xAxis+MAP_SIZE-BOOSTER_WIDTH*2,yAxis+MAP_MARGIN-BOOSTER_WIDTH,BOOSTER_WIDTH,BOOSTER_WIDTH*7);

  //mouth
  context.drawImage(getAsset('boosterZoneFaster.png'),xAxis+MAP_MARGIN+3.5*WALL_WIDTH,yAxis+MAP_MARGIN+WALL_WIDTH*10,WALL_WIDTH*3,BOOSTER_WIDTH);

  //left corner
  context.drawImage(getAsset('boosterZoneFaster.png'),xAxis+MAP_MARGIN,yAxis+MAP_MARGIN+WALL_WIDTH*11,BOOSTER_WIDTH,BOOSTER_WIDTH*4);

  //mud zone
  //context.drawImage(getAsset('boosterZoneSlower.png'),xAxis+MAP_MARGIN+8.5*WALL_WIDTH, yAxis+MAP_MARGIN+WALL_WIDTH*8.5,WALL_WIDTH*2,WALL_WIDTH*2.5);
  context.drawImage(getAsset('InkedboosterZoneSlower.jpg'),xAxis+MAP_MARGIN+8.5*WALL_WIDTH, yAxis+MAP_MARGIN+WALL_WIDTH*8.5,WALL_WIDTH*2,WALL_WIDTH*2.5);
  
  // Draw all players
  renderPlayer(me, me);
  others.forEach(renderPlayer.bind(null, me));
  //obstacles.forEach(renderObstacles());
}


function renderBackground(x, y) {
  const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
  const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;
  //var image1 = new Image();

  //image1.src = 'https://cdn.pixabay.com/photo/2016/01/23/07/56/background-1157111_960_720.jpg';  

  var pat1 = context.createPattern(getAsset('background1.jpg'), "repeat");
  context.fillStyle = pat1;
  //context.fillRect(50, 20, 100, 150);
  context.translate(backgroundX, backgroundY);
  context.fillRect(-backgroundX, -backgroundY, canvas.width, canvas.height);
  context.translate(-backgroundX, -backgroundY);
}

// Renders a ship at the given coordinates
function renderPlayer(me, player) {
  const { x, y, direction } = player;
  const canvasX = canvas.width / 2 + x - me.x;
  const canvasY = canvas.height / 2 + y - me.y;
  var playerImage = 'ship.svg';
  if (!player.infected){
    //playerImage = 'man1.png'
    var playerImage = player.image;
    if (playerImage.includes('NaN')){
      playerImage = playerImage.substring(0, playerImage.length - 3);
      console.log(playerImage);
    }
  }
  //console.log("canvasX = " + x);
  // Draw ship
  context.save();
  context.translate(canvasX, canvasY);
  context.rotate(direction);
  context.drawImage(
    getAsset(playerImage),
    -PLAYER_RADIUS,
    -PLAYER_RADIUS,
    PLAYER_RADIUS * 2,
    PLAYER_RADIUS * 2,
  );
  context.restore();

}


function renderMainMenu() {
  const t = Date.now() / 7500;
  const x = MAP_SIZE / 2 + 800 * Math.cos(t);
  const y = MAP_SIZE / 2 + 800 * Math.sin(t);
  renderBackground(x, y);
}

let renderInterval = setInterval(renderMainMenu, 1000 / 60);

// Replaces main menu rendering with game rendering.
export function startRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(render, 1000 / 60);
}

// Replaces game rendering with main menu rendering.
export function stopRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(renderMainMenu, 1000 / 60);
}
