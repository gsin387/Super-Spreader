import { updateDirection, updateSpeed } from './networking';
const Constants = require('../shared/constants');

var mapOfKeys = new Map();
mapOfKeys.set('KeyW', false);
mapOfKeys.set('KeyA', false);
mapOfKeys.set('KeyS', false);
mapOfKeys.set('KeyD', false);

function onKeyInput(e){
  e = e || window.event; // to deal with IE
  mapOfKeys.set(e.code, e.type == 'keydown');
  console.log(mapOfKeys);

  updateSpeed(Constants.PLAYER_SPEED);
  if (mapOfKeys.get('KeyW') && !mapOfKeys.get('KeyA')  && !mapOfKeys.get('KeyS')  && !mapOfKeys.get('KeyD')){
    updateDirection(0);

  } else if(mapOfKeys.get('KeyA') && !mapOfKeys.get('KeyW')  && !mapOfKeys.get('KeyS')  && !mapOfKeys.get('KeyD')){
    updateDirection(-(Math.PI/2));

  } else if(mapOfKeys.get('KeyS') && !mapOfKeys.get('KeyA')  && !mapOfKeys.get('KeyW')  && !mapOfKeys.get('KeyD')){
    updateDirection(Math.PI);

  } else if(mapOfKeys.get('KeyD') && !mapOfKeys.get('KeyA')  && !mapOfKeys.get('KeyS')  && !mapOfKeys.get('KeyW')){
    updateDirection(Math.PI/2);
    
  } else if(mapOfKeys.get('KeyW') && mapOfKeys.get('KeyA')  && !mapOfKeys.get('KeyS')  && !mapOfKeys.get('KeyD')){
    updateDirection(-(Math.PI/4));

  } else if(mapOfKeys.get('KeyW') && !mapOfKeys.get('KeyA')  && !mapOfKeys.get('KeyS')  && mapOfKeys.get('KeyD')){
    updateDirection(Math.PI/4);
    
  } else if(!mapOfKeys.get('KeyW') && mapOfKeys.get('KeyA')  && mapOfKeys.get('KeyS')  && !mapOfKeys.get('KeyD')){
    updateDirection(-(3*Math.PI/4));
    
  } else if(!mapOfKeys.get('KeyW') && !mapOfKeys.get('KeyA')  && mapOfKeys.get('KeyS')  && mapOfKeys.get('KeyD')){
    updateDirection(3*Math.PI/4);
    
  } else if(!mapOfKeys.get('KeyW') && !mapOfKeys.get('KeyA')  && !mapOfKeys.get('KeyS')  && !mapOfKeys.get('KeyD')){
    updateSpeed(0);
    
  }
  

}


export function startCapturingInput() {
  window.addEventListener('keydown', onKeyInput);
  window.addEventListener('keyup', onKeyInput);
}

export function stopCapturingInput() {
  window.removeEventListener('keydown', onKeyInput);
  window.removeEventListener('keyup', onKeyInput);
}

