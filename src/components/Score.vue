<script setup lang="ts">
import { ref } from 'vue';
import { Game } from '../models/Game';


interface ScoreProps{
    games: Game[]
}
const props = defineProps<ScoreProps>()

const games = ref<Game[]>(props.games)
const players = games.value[games.value.length-1].players


console.log(games.value[games.value.length-1].players)
</script>

<template>
<article class="score-board">
    <table>
        <thead>
            <tr>
                <th>Game id: {{ games[games.length-1].id }}</th>
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

</style>