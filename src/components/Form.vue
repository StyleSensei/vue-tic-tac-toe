<script setup lang="ts">
import Input from './Input.vue';
import Button from './Button.vue';
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'onSubmit', model: string): void;
}>();
const model = ref("")

const handleOnSubmit = () => {
emit('onSubmit', model.value)
model.value = ''
}
</script>

<template>
  <form @submit.prevent = handleOnSubmit>
    <!-- <Input id="user" label="Användare" v-model="model" ></Input> -->
    <input id="user" v-model="model">
    <!-- <Input id="user2" label="Användare 2"></Input> -->
    <Button
      id="submit-user-name"
      title="submit"
      text="Lägg till spelare"
    ></Button>
  </form>
  
</template>

<style scoped></style>
