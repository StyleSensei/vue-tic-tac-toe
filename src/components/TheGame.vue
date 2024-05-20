<script setup lang="ts">
import { ref } from 'vue';
import Form from './Form.vue';
import Button from './Button.vue';
import { IGameState } from '../models/IGameState';
import { Player } from '../models/Player';
import { Game } from '../models/Game';

const state = ref<IGameState>({
    games : [],
    players: [],
    results: []
})
const handleSubmit = (input:string) => {
state.value.players.push(new Player(input))
console.log('ny spelare')
console.log(state.value.players)
}

const startGame = () => {
    state.value.games.push(new Game(state.value.players))
    
    console.log(state.value.games)
}

</script>

<template>
<Form @on-submit="(input:string) => handleSubmit(input)"></Form>
<Button id="start-game" text="Starta spel" title="start game" @on-click="startGame"></Button>
</template>

<style scoped>

</style>