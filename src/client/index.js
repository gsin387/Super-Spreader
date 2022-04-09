import { connect, joinGame, createGame, emitStartGame } from './networking';
import { startRendering, stopRendering } from './render';
import { startCapturingInput, stopCapturingInput } from './input';
import { downloadAssets } from './assets';
import { initState } from './state';
import { setTimer } from './timer';

import './css/bootstrap-reboot.css';
import './css/main.css';

const playMenu = document.getElementById('play-menu');
const lobbyScreen = document.getElementById('lobby-screen');

const playButton = document.getElementById('play-button');
const joinButton = document.getElementById('join-button');
const gameStartButton = document.getElementById('gameStart-button');

const usernameInput = document.getElementById('username-input');
const roomIDInput = document.getElementById('roomID-input');

const playerList = [];

Promise.all([connect(onGameOver), downloadAssets()])
  .then(() => {
    playMenu.classList.remove('hidden');
    usernameInput.focus();
    roomIDInput.focus();
    // createGame.onclick = () => {
    //   createGame(usernameInput.value);
    // };

    joinButton.onclick = () => {
      joinGame(usernameInput.value, roomIDInput.value);
    };

    //this should only run after
    playButton.onclick = () => {
      createGame(usernameInput.value);
      playMenu.classList.add('hidden');
      lobbyScreen.classList.remove('hidden');
      playerList.push(usernameInput.value);
      document.getElementById('demo').innerHTML = playerList;
    };

    //this should only run after
    gameStartButton.onclick = () => {
      emitStartGame();
      startGame();
    };
  })
  .catch(console.error);

export function startGame() {
  lobbyScreen.classList.add('hidden');
  initState();
  startCapturingInput();
  startRendering();
  setTimer(false);
}

export function showErrorMessage() {
  document.getElementById('errorRoomCode-modal').classList.remove('hidden');
  setTimeout(function () {
    document.getElementById('errorRoomCode-modal').classList.add('hidden');
  }, 3000);
}

export function showLobbyScreen() {
  playMenu.classList.add('hidden');
  lobbyScreen.classList.remove('hidden');
  playerList.push(usernameInput.value);
  document.getElementById('demo').innerHTML = playerList;
}

function onGameOver() {
  stopCapturingInput();
  stopRendering();
  playMenu.classList.remove('hidden');
}
