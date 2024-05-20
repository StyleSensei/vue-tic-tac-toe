<script setup lang="ts">
import { ref } from 'vue';
import Form from './Form.vue';
import { IGameSate } from '../models/IGameState';
import { Player } from '../models/Player';
const state = ref<IGameSate>({
    games : [],
    players: [],
    results: []
})
const handleSubmit = (input:string) => {
state.value.players.push(new Player(input))
console.log('ny spelare')
console.log(state.value.players[0])
}

</script>

<template>
<Form @on-submit="(input:string) => handleSubmit(input)"></Form>
</template>

<style scoped>

</style>