<script setup lang="ts">
import { canDoubleDown, canSplit, state, doubleDown, endHand, hit, split } from '@/store'
import PlayerBank from '@/components/PlayerBank.vue'
</script>

<template>
  <div role="toolbar">
    <button :disabled="!canDoubleDown" @click="doubleDown">Double<br />Down</button>
    <button :disabled="!canSplit" @click="split">Split</button>
    <PlayerBank />
    <button :disabled="state.isDealing" @click="endHand">Stand</button>
    <button :disabled="state.isDealing" @click="hit">Hit</button>
  </div>
</template>

<style scoped>
[role='toolbar'] {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  width: max-content;
  margin: 0 auto;
  order: -1;
}
button:first-of-type {
  font-size: 2rem;
}
</style>
