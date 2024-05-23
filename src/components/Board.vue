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
  (e: 'playerMove', rowIndex: number, cellIndex: number): void;
  (e: 'updateCurrentPlayer', currentPlayerValue: string): void;
  (e: 'newGame'): void;
  (e: 'theWinner', theWinner: string): void;
  (e: 'gameFinished'): void;
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
    setTimeout(() => {
      alert(theWinner + ' is the winner');
      emit('gameFinished');
    }, 1000);
  }
  emit('theWinner', theWinner);
};



const makeMove = (rowIndex: number, cellIndex: number) => {
  props.board[rowIndex][cellIndex] = currentPlayer.value;
  winningGame();
  checkIfDraw();
  nameOfTheWinner();
  currentPlayer.value = currentPlayer.value === 'X' ? '0' : 'X';
  emit('updateCurrentPlayer', currentPlayer.value);
};
const winningGame = () => {
  for (let i = 0; i < 3; i++) {
    if (props.board[i].every((cell) => cell === currentPlayer.value))
      return true;

    if (props.board.every((row) => row[i] === currentPlayer.value)) return true;
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
  return false;
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
    alert('draw');
  }

  return isDraw;
};
</script>

<template>
  <section id="stats">
    <article>
      <ul>
        currentPlayer:
        {{
          currentPlayer
        }}
        <li v-for="(player, i) in playersInGame" key="i">
          <span v-if="i === 0"> Player {{ player0 }}: </span>
          <span v-else> Player {{ playerX }}: </span>

          {{ player.playerName }},
        </li>
      </ul>
    </article>
    <Score :games="games"></Score>
  </section>

  <table>
    <tr v-for="(row, rowIndex) in board" :key="rowIndex">
      <td
        v-for="(cell, cellIndex) in row"
        :key="cellIndex"
        :aria-disabled="board[rowIndex][cellIndex] != '' || theWinner != ''"
        @click="
          $emit('playerMove', rowIndex, cellIndex),
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
      text="Starta nytt spel"
      @on-click="
        () => {
          theWinner = '';
          $emit('newGame');
        }
      "
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
