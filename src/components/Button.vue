<script setup lang="ts">
interface ButtonProps {
    text: string;
    id:string
    title:string
}
defineProps<ButtonProps>()

defineEmits<{
    (e: 'onClick'):void
}>()
</script>

<template>
<button @click="$emit('onClick')" id="id" :disabled="false"
>{{ text }}</button>
</template>

<style scoped>
button{
    margin: 0 1rem
}
</style>