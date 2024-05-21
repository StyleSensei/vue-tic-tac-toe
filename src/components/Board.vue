<script setup lang="ts">
import { ref } from 'vue';
import { Player } from '../models/Player';

interface BoardProps {
  board: [string[], string[], string[]];
  playersInGame: Player[];
  currentPlayer: string;
}
const props = defineProps<BoardProps>();

let currentPlayer = ref(props.currentPlayer);
const emit = defineEmits<{
  (e: 'playerMove', rowIndex: number, cellIndex: number): void;
  (e: 'updateCurrentPlayer', currentPlayerValue: string): void;
}>();

const player0 = props.playersInGame[0].symbol;
const playerX = props.playersInGame[1].symbol;



const makeMove = (rowIndex: number, cellIndex: number) => {
    props.board[rowIndex][cellIndex] = currentPlayer.value;
    console.log(props.board);
    checkForWinningGame();
    if (checkForWinningGame()) {
        alert(currentPlayer.value + ' is the winner')
      console.log('winner');
  }
    currentPlayer.value = currentPlayer.value === 'X' ? '0' : 'X';
    emit('updateCurrentPlayer', currentPlayer.value);
};
const checkForWinningGame = () => {
  for (let i = 0; i < 3; i++) {
    if (props.board[i].every(cell => cell === currentPlayer.value))
      return true;

    if (props.board.every(row => row[i] === currentPlayer.value)) return true;
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
</script>

<template>
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
  <tr v-for="(row, rowIndex) in board" :key="rowIndex">
    <td
      v-for="(cell, cellIndex) in row"
      :key="cellIndex"
      @click="
        $emit('playerMove', rowIndex, cellIndex), makeMove(rowIndex, cellIndex)
      "
    >
      row: {{ rowIndex }}, cell: {{ cellIndex }}
      <p>
        {{ cell }}
      </p>
    </td>
  </tr>
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
</style>
