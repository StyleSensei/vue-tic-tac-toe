<script setup lang="ts">
import { Ref, nextTick, onMounted, ref, watch } from 'vue';
import Form from './Form.vue';
import Button from './Button.vue';
import GameParticipants from './GameParticipants.vue';
import { IGameState } from '../models/IGameState';
import { Player } from '../models/Player';
import { Game } from '../models/Game';
import Board from './Board.vue';

let state = ref<IGameState>({
  games: [],
  players: [],
  results: [],
  gameRunning: false,
  currentPlayer: {
    id: 0,
    isCurrentPlayer: true,
    symbol: '',
    points: 0,
    playerName: '',
  },
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
      state.value.games[state.value.games.length - 1].players[0].isCurrentPlayer
    );
    watch(playerOneIsCurrentPlayer, (updatedValue) => {
      state.value.games[
        state.value.games.length - 1
      ].players[0].isCurrentPlayer = updatedValue;
    });

    let playerTwoIsCurrentPlayer = ref<boolean>(
      state.value.games[state.value.games.length - 1].players[1].isCurrentPlayer
    );
    watch(playerTwoIsCurrentPlayer, (updatedValue) => {
      state.value.games[
        state.value.games.length - 1
      ].players[1].isCurrentPlayer = updatedValue;
    });

    playerOneIsCurrentPlayer.value = randomBoolean();
    if (playerOneIsCurrentPlayer.value === true) {
      state.value.currentPlayer =
        state.value.games[state.value.games.length - 1].players[0];
      playerTwoIsCurrentPlayer.value = false;
    } else {
      playerTwoIsCurrentPlayer.value = true;
      state.value.currentPlayer =
        state.value.games[state.value.games.length - 1].players[1];
    }
  };
  startingPlayer();
};

const updateCurrentPlayer = (currentPlayer: Player) => {
  state.value.currentPlayer = currentPlayer;
  console.log('currentplayer: '+currentPlayer.playerName)
  state.value.players.map((player) => {
    if (player === currentPlayer) {
      return {
        ...player, isCurrentPlayer: true,
      };
    } else {
      return (player.isCurrentPlayer = false);
    }
  });
  state.value.games[state.value.games.length - 1].players.map((player) => {
    if (player === currentPlayer) {
      return (player.isCurrentPlayer = true);
    } else {
      return (player.isCurrentPlayer = false);
    }
  });
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
    currentPlayer: {
      id: 0,
      isCurrentPlayer: true,
      symbol: '',
      points: 0,
      playerName: '',
    },
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
      text="Start game"
      title="start game"
      :disabled="state.players.length < 2"
      @on-click="startGame"
    ></Button>
    <GameParticipants
      v-if="!state.gameRunning"
      :players="state.players"
    ></GameParticipants>
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

<style scoped>
section {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
button {
  padding: 1rem 4rem;
  max-width: 300px;
}
</style>
