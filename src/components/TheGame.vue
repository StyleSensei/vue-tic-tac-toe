<script setup lang="ts">
import { Ref, nextTick, onMounted, ref, watch } from 'vue';
import Form from './Form.vue';
import Button from './Button.vue';
import { IGameState } from '../models/IGameState';
import { Player } from '../models/Player';
import { Game } from '../models/Game';
import Board from './Board.vue';

let state = ref<IGameState>({
  games: [],
  players: [],
  results: [],
  gameRunning: false,
  currentPlayer: '',
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
});

onMounted(() => {
  const storedState = localStorage.getItem('state.value');
  if (storedState) {
    state.value = JSON.parse(storedState);
  }
});

watch(
  () => state.value,
  async (newValue) => {
    await nextTick();
    localStorage.setItem('state.value', JSON.stringify(newValue));
  },
  { deep: true }
);

const handleSubmit = (input: string) => {
  state.value.players.push(new Player(input));
};

const startGame = () => {
  state.value.board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  state.value.games.push(new Game(state.value.players));
  state.value.games[state.value.games.length - 1].players[0].symbol = '0';
  state.value.games[state.value.games.length - 1].players[1].symbol = 'X';
  state.value.gameRunning = true;

  const startingPlayer = () => {
    const randomBoolean = () => Math.random() >= 0.5;
    let playerOneIsCurrentPlayer = ref<boolean>(
      state.value.games[state.value.games.length - 1].players[0].currentPlayer
    );
    watch(playerOneIsCurrentPlayer, (updatedValue) => {
      state.value.games[state.value.games.length - 1].players[0].currentPlayer =
        updatedValue;
    });

    let playerTwoIsCurrentPlayer = ref<boolean>(
      state.value.games[state.value.games.length - 1].players[1].currentPlayer
    );
    watch(playerTwoIsCurrentPlayer, (updatedValue) => {
      state.value.games[state.value.games.length - 1].players[1].currentPlayer =
        updatedValue;
    });

    playerOneIsCurrentPlayer.value = randomBoolean();
    if (playerOneIsCurrentPlayer.value === true) {
      state.value.currentPlayer =
        state.value.games[state.value.games.length - 1].players[0].symbol;
      playerTwoIsCurrentPlayer.value = false;
    } else {
      playerTwoIsCurrentPlayer.value = true;
      state.value.currentPlayer =
        state.value.games[state.value.games.length - 1].players[1].symbol;
    }
  };
  startingPlayer();
};

const updateCurrentPlayer = (currentPlayerValue: string) => {
  state.value.currentPlayer = currentPlayerValue;
};

const updateScoreAndWinner = (theWinnerName: string) => {
  const currentGame = state.value.games[state.value.games.length - 1];
  const currentPlayers = state.value.players;
  currentGame.winner = theWinnerName;
  currentPlayers.forEach((player) => {
    if (player.playerName === theWinnerName) {
      player.points++;
    }
  });
};
//

const resetGame = () => {
  state.value = {
    games: [],
    players: [],
    results: [],
    gameRunning: false,
    currentPlayer: '',
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
  };
};

const updateBoard = (rowIndex: number, cellIndex: number, value: string) => {
  state.value.board[rowIndex][cellIndex] = value;
};
</script>

<template>
  <section v-if="!state.gameRunning">
    <Form
      v-if="state.players.length < 2"
      @on-submit="(input:string) => handleSubmit(input)"
    ></Form>
    <Button
      id="start-game"
      text="Starta spel"
      title="start game"
      @on-click="startGame"
    ></Button>
  </section>
  <Board
    v-if="state.gameRunning"
    :board="state.board"
    :players-in-game="state.players"
    :current-player="state.currentPlayer"
    :games="state.games"
    @update-current-player="updateCurrentPlayer"
    @new-game="startGame"
    @the-winner="updateScoreAndWinner"
    @reset="resetGame"
    @player-move="updateBoard"
  ></Board>
</template>

<style scoped></style>
