<script setup lang="ts">
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
  <h1>Tic Tac Toe</h1>
  <form @submit.prevent = handleOnSubmit>
    <label for="user"> Username
    <input id="user" v-model="model"/>
  </label>
    <Button
      id="submit-user-name"
      title="submit"
      text="Add player"
      :disabled="model === '' || model.startsWith(' ')"
    ></Button>
  </form>

</template>

<style scoped lang="scss">
form{
  padding:3rem;
  display: flex;
  align-items: center;
}
input{
  padding: .5rem 1rem;
}
</style>
