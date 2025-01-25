<script setup lang="ts">
import { computed, ref } from 'vue';
import { Game } from '../models/Game';
import { Player } from '../models/Player';

interface ScoreProps {
  games: Game[];
  players: Player[];
}
const props = defineProps<ScoreProps>();
</script>

<template>
  <article class="score-board">
    <table>
      <thead>
        <tr>
          <th>Game id: {{ games[games.length - 1].id }}</th>
          <th></th>
        </tr>
        <tr>
          <th>Player</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in players" :key="player.id">
          <th>{{ player.playerName }}</th>
          <td>{{ player.points }}</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<style scoped>

table{
  text-align: start;

}
th{
text-align: left;
}

</style>
