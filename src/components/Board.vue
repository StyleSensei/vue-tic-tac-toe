<script setup lang="ts">
import { ref } from 'vue';
import { Player } from '../models/Player';
import Button from './Button.vue';
import Score from './Score.vue';
import { Game } from '../models/Game';

interface BoardProps {
  board: [string[], string[], string[]];
  playersInGame: Player[];
  currentPlayer: string;
  games: Game[];
}
const props = defineProps<BoardProps>();

let currentPlayer = ref(props.currentPlayer);
const emit = defineEmits<{
  (
    e: 'playerMove',
    rowIndex: number,
    cellIndex: number,
    currentPlayerValue: string
  ): void;
  (e: 'updateCurrentPlayer', currentPlayerValue: string): void;
  (e: 'newGame'): void;
  (e: 'theWinner', theWinner: string): void;
  (e: 'reset'): void;
}>();

const player0 = props.playersInGame[0].symbol;
const playerX = props.playersInGame[1].symbol;
let theWinner: string = props.games[props.games.length - 1].winner;

const nameOfTheWinner = () => {
  if (winningGame()) {
    theWinner =
      currentPlayer.value === '0'
        ? props.playersInGame[0].playerName
        : props.playersInGame[1].playerName;
    // alert(theWinner + ' is the winner');
  }
  emit('theWinner', theWinner);
};

const makeMove = (rowIndex: number, cellIndex: number) => {
  emit('playerMove', rowIndex, cellIndex, currentPlayer.value);
  winningGame();
  checkIfDraw();
  nameOfTheWinner();
  currentPlayer.value = currentPlayer.value === 'X' ? '0' : 'X';
  emit('updateCurrentPlayer', currentPlayer.value);
};

const winningGame = () => {
  let combinedArray = props.board.flat();
  let isWinningRow = false;

  for (let i = 0; i < 3; i++) {
    if (
      combinedArray[i] === currentPlayer.value &&
      combinedArray[i + 3] === currentPlayer.value &&
      combinedArray[i + 6] === currentPlayer.value
    )
      isWinningRow = true;
  }
  for (let j = 0; j < 9; j += 3) {
    if (
      combinedArray[j] === currentPlayer.value &&
      combinedArray[j + 1] === currentPlayer.value &&
      combinedArray[j + 2] === currentPlayer.value
    )
      isWinningRow = true;
  }

  if (
    props.board[0][0] === currentPlayer.value &&
    props.board[1][1] === currentPlayer.value &&
    props.board[2][2] === currentPlayer.value
  ) {
    return true;
  }
  if (
    props.board[0][2] === currentPlayer.value &&
    props.board[1][1] === currentPlayer.value &&
    props.board[2][0] === currentPlayer.value
  ) {
    return true;
  }
  return isWinningRow;
};

const checkIfDraw = () => {
  let isDraw = true;

  props.board.forEach((row) => {
    row.forEach((cell) => {
      if (cell === '' ) {
        isDraw = false;
      }
    });
  });

  if (!winningGame() && isDraw) {
    isDraw = true
  }
  if (winningGame() && isDraw) {
    isDraw = false
  }

  return isDraw;
};
</script>

<template>
  <section id="stats">
    <article>
      <p>
        <span v-if="currentPlayer === 'X' && theWinner === '' && !checkIfDraw()">
          Make a move,
          {{ playersInGame[1].playerName }}!
        </span>
        <span v-if="currentPlayer === '0' && theWinner === '' && !checkIfDraw()">
          Make a move,
          {{ playersInGame[0].playerName }}!
        </span>
        <span v-if="theWinner !== '' ">
          {{ theWinner }}
          won!
        </span>
        <span v-if="theWinner === '' && checkIfDraw()">Draw!</span>
      </p>
    </article>

    <Score :games="games" :players="playersInGame"></Score>
  </section>

  <table>
    <tr v-for="(row, rowIndex) in board" :key="rowIndex">
      <td
        v-for="(cell, cellIndex) in row"
        :key="cellIndex"
        :aria-disabled="board[rowIndex][cellIndex] != '' || theWinner != ''"
        @click="
          $emit('playerMove', rowIndex, cellIndex, currentPlayer),
            makeMove(rowIndex, cellIndex)
        "
      >
        row: {{ rowIndex }}, cell: {{ cellIndex }}
        <p>
          {{ cell }}
        </p>
      </td>
    </tr>
  </table>

  <div>
    <Button
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

  width: 60vw;
}

td {
  /* padding: 5rem; */
  background-color: antiquewhite;
  color: black;
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
}
p {
  font-size: 3rem;
}
[aria-disabled='true'] {
  pointer-events: none;
}

#stats {
  display: flex;
  justify-content: space-between;
}
</style>
