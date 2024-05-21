<script setup lang="ts">
import { Ref, onMounted, ref, watch } from 'vue';
import Form from './Form.vue';
import Button from './Button.vue';
import { IGameState } from '../models/IGameState';
import { Player } from '../models/Player';
import { Game } from '../models/Game';
import Board from './Board.vue';

const state = ref<IGameState>({
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
const handleSubmit = (input: string) => {
  state.value.players.push(new Player(input));
  console.log();
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
  console.log(state.value.gameRunning);
  console.log(state.value.games);

  const startingPlayer = () => {
    const randomBoolean = () => Math.random() >= 0.5;
    let playerOneIsCurrentPlayer = ref<boolean>(
      state.value.games[state.value.games.length - 1].players[0].currentPlayer
    );
    watch(playerOneIsCurrentPlayer, (updatedValue) => {
      state.value.games[state.value.games.length - 1].players[0].currentPlayer =
        updatedValue;
    });

    let playerTwoIsCurrentPlayer = ref(
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
    :players-in-game="state.games[state.games.length - 1].players"
    :current-player="state.currentPlayer"
    @update-current-player="updateCurrentPlayer"
    @new-game="startGame"
    @the-winner="
      (theWinner) => (state.games[state.games.length - 1].winner = theWinner)
    "
    @game-finished="state.gameRunning=false"
  ></Board>
</template>

<style scoped></style>
