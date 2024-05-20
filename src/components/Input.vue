<script setup lang="ts">

interface InputProps {
  label: string;
  id: string;
}
defineProps<InputProps>();
const model = defineModel();

defineEmits<{
  (e: 'myInput', model: string): void;
}>();

</script>

<template>
  <label :for="id"
    >{{ label }}
    <input :id="id"
    />
  </label>
</template>

<style scoped>

</style>