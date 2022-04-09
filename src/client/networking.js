import io from 'socket.io-client';
import { throttle } from 'throttle-debounce';
import { processGameUpdate } from './state';
import { startGame, showLobbyScreen, showErrorMessage } from './index';

const Constants = require('../shared/constants');
const roomID = 0;

const socketProtocol = window.location.protocol.includes('https')
  ? 'wss'
  : 'ws';
const socket = io(`${socketProtocol}://${window.location.host}`, {
  reconnection: false,
});
const connectedPromise = new Promise((resolve) => {
  socket.on('connect', () => {
    console.log('Connected to server!');
    resolve();
  });
});

export const connect = (onGameOver) =>
  connectedPromise.then(() => {
    socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    socket.on('countdown', updateCountDown);
    socket.on('timeout', timeOut);
    socket.on(Constants.MSG_TYPES.GAME_OVER, onGameOver);

    socket.on('gameStart', startGame);
    socket.on('lobby-join', renderLobbyScreen);
    socket.on('infected', infectedPopUp);
    socket.on('disconnect', () => {
      console.log('Disconnected from server.');
      document.getElementById('disconnect-modal').classList.remove('hidden');
      document.getElementById('reconnect-button').onclick = () => {
        window.location.reload();
      };
    });
  });

function renderLobbyScreen(data) {
  if (data.noRoom) {
    showErrorMessage();
  } else {
    showLobbyScreen();
    document.getElementById('lobbyCode').innerHTML = data.roomID;

    let ul = document.createElement('ul');

    document.getElementById('demo').innerHTML = '';
    document.getElementById('demo').appendChild(ul);

    data.userNameList.forEach(function (item) {
      let li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML += item;
    });
  }
}

function infectedPopUp() {
  document.getElementById('infected-modal').classList.remove('hidden');
  setTimeout(function () {
    document.getElementById('infected-modal').classList.add('hidden');
  }, 2000);
}

function timeOut(results) {
  document.getElementById('Game-over').classList.remove('hidden');
  document.getElementById('winner-message').innerHTML = results;
  document.getElementById('play-again').onclick = () => {
    window.location.reload();
  };
}

function updateCountDown(newTime) {
  document.getElementById('demo2').innerHTML = newTime;
}

export const createGame = (username) => {
  socket.emit(Constants.MSG_TYPES.CREATE_GAME, username);
};

export const joinGame = (username, roomID) => {
  socket.emit(Constants.MSG_TYPES.JOIN_GAME, {
    username: username,
    roomID: roomID,
  });
};

export const emitStartGame = () => {
  socket.emit('gameStartClicked');
};

export const updateDirection = throttle(20, (dir) => {
  socket.emit(Constants.MSG_TYPES.INPUT, dir);
});

export const updateSpeed = throttle(20, (speed) => {
  socket.emit(Constants.MSG_TYPES.INPUT_SPEED, speed);
});
