<script setup lang="ts">
// import Input from './Input.vue';
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
    <label for="user"> Username
    <input id="user" v-model="model"/>
  </label>
    <Button
      id="submit-user-name"
      title="submit"
      text="Add player"
    ></Button>
  </form>
  
</template>

<style scoped></style>
