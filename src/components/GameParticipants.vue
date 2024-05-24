<script setup lang="ts">
import { Player } from '../models/Player';

interface PlayerProps {
  players: Player[];
}
defineProps<PlayerProps>();
</script>

<template>
  <div id="players">
    <h1><span v-if="players.length >= 1">

        {{ players[0].playerName }}
    </span>
    </h1>

    <h1><span v-if="players.length === 2">
{{ players[1].playerName }}
    </span> </h1>
  </div>
</template>

<style scoped>
 #players{
  display: flex;
  width: 80vw;
  justify-content: space-around;
  padding: 10rem;
  position: absolute;
  bottom: 2rem;
}
</style>
