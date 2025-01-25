<script setup lang="ts">
import { ref } from 'vue';
import { Player } from '../models/Player';
import Button from './Button.vue';
import Score from './Score.vue';
import { Game } from '../models/Game';

interface BoardProps {
  board: [string[], string[], string[]];
  playersInGame: Player[];
  currentPlayer: Player;
  games: Game[];
}
const props = defineProps<BoardProps>();

const currentPlayer = ref(props.currentPlayer);
const emit = defineEmits<{
  (
    e: 'playerMove',
    rowIndex: number,
    cellIndex: number,
    currentPlayerValue: string
  ): void;
  (e: 'updateCurrentPlayer', currentPlayerValue: Player): void;
  (e: 'newGame'): void;
  (e: 'theWinner', theWinner: string): void;
  (e: 'reset'): void;
}>();


let theWinner: string = props.games[props.games.length - 1].winner;

const nameOfTheWinner = () => {
  if (winningGame()) {
    theWinner =
      currentPlayer.value.symbol === '0'
        ? props.playersInGame[0].playerName
        : props.playersInGame[1].playerName;
  }
  emit('theWinner', theWinner);
};

const makeMove = (rowIndex: number, cellIndex: number) => {
  emit('playerMove', rowIndex, cellIndex, currentPlayer.value.symbol);
  winningGame();
  checkIfDraw();
  nameOfTheWinner();
  currentPlayer.value =
    props.playersInGame[0] === currentPlayer.value
      ? props.playersInGame[1]
      : props.playersInGame[0];
  if (!winningGame()) emit('updateCurrentPlayer', currentPlayer.value);
  else {
    emit('updateCurrentPlayer', {
      id: 0,
      isCurrentPlayer: true,
      symbol: '',
      points: 0,
      playerName: '',
    });
  }
};

const winningGame = () => {
  let combinedArray = props.board.flat();
  let isWinningRow = false;

  for (let i = 0; i < 3; i++) {
    if (
      combinedArray[i] === currentPlayer.value.symbol &&
      combinedArray[i + 3] === currentPlayer.value.symbol &&
      combinedArray[i + 6] === currentPlayer.value.symbol
    )
      isWinningRow = true;
  }
  for (let j = 0; j < 9; j += 3) {
    if (
      combinedArray[j] === currentPlayer.value.symbol &&
      combinedArray[j + 1] === currentPlayer.value.symbol &&
      combinedArray[j + 2] === currentPlayer.value.symbol
    )
      isWinningRow = true;
  }

  if (
    props.board[0][0] === currentPlayer.value.symbol &&
    props.board[1][1] === currentPlayer.value.symbol &&
    props.board[2][2] === currentPlayer.value.symbol
  ) {
    return true;
  }
  if (
    props.board[0][2] === currentPlayer.value.symbol &&
    props.board[1][1] === currentPlayer.value.symbol &&
    props.board[2][0] === currentPlayer.value.symbol
  ) {
    return true;
  }
  return isWinningRow;
};

const checkIfDraw = () => {
  let isDraw = true;

  props.board.forEach((row) => {
    row.forEach((cell) => {
      if (cell === '') {
        isDraw = false;
      }
    });
  });

  if (!winningGame() && isDraw) {
    isDraw = true;
  }
  if (winningGame() && isDraw) {
    isDraw = false;
  }

  return isDraw;
};
</script>

<template>
  <section id="stats">
    <article>
      <p>
        <span v-if="theWinner === '' && !checkIfDraw()">
          Make a move,
          {{ props.currentPlayer.playerName }}!
        </span>

        <span v-if="theWinner !== ''">
          {{ theWinner }}
          won!
        </span>
        <span v-if="theWinner === '' && checkIfDraw()">Draw!</span>
      </p>
    </article>
  </section>
  <Score :games="games" :players="playersInGame"></Score>

  <table>
    <tr v-for="(row, rowIndex) in board" :key="rowIndex">
      <td
        v-for="(cell, cellIndex) in row"
        :key="cellIndex"
        :aria-disabled="board[rowIndex][cellIndex] != '' || theWinner != ''"
        @click="
          $emit('playerMove', rowIndex, cellIndex, currentPlayer.symbol),
            makeMove(rowIndex, cellIndex)
        "
      >
        <p>
          {{ cell }}
        </p>
      </td>
    </tr>
  </table>

  <div>
    <Button
      class="new-game"
      id="new-game"
      title="new game"
      text="Start new round"
      @on-click="
        () => {
          theWinner = '';
          $emit('newGame');
        }
      "
    ></Button>
    <Button
      class="reset"
      id="reset"
      title="reset"
      text="Reset"
      @on-click="$emit('reset')"
    ></Button>
  </div>
</template>

<style scoped lang="scss">
ul {
  text-align: left;
  margin-bottom: 2rem;
  li {
    list-style: none;
  }
}

tr {
  display: flex;
  /* gap: 10px; */
  justify-content: space-around;
  margin-bottom: 2rem;
  gap: 2rem;
}

td {
  background-color: antiquewhite;
  color: black;
  width: 25vw;
  height: 25vw;
  max-width: 180px;
  max-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}
p {
  font-size: 3rem;
  margin: 1.5rem auto;
}
[aria-disabled='true'] {
  pointer-events: none;
}

#stats {
  display: flex;
  justify-content: space-between;
}
.reset {
  background-color: red;
}
.new-game {
  background-color: blue;
}
</style>
