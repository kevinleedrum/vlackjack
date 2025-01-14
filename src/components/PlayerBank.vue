<template>
  <span role="status" class="bank" :class="{ 'is-increasing': isIncreasing }">
    <svg role="img" aria-label="Chips" class="chip" :class="{ 'is-spinning': isIncreasing }">
      <use href="#chip" />
    </svg>
    <span class="times">&times;</span>
    <span class="number">{{ state.players[0].bank }}</span>
  </span>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { state } from '../store'

const isIncreasing = ref(false)

watch(
  () => state.players[0].bank,
  (current, previous) => {
    if (current > previous) {
      isIncreasing.value = true
      setTimeout(() => {
        isIncreasing.value = false
      }, 1000)
    }
  },
)
</script>

<style scoped>
.bank {
  background: rgba(0, 0, 0, 0.2);
  height: 4rem;
  display: flex;
  align-self: center;
  padding: 0.75rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.75rem;
  font-size: 2.75rem;
  font-variation-settings: 'wght' 600;
  line-height: 1;
  transition: all 0.2s ease;
  color: var(--color-gold);
  gap: 0.5rem;
}
.bank.is-increasing {
  background: rgba(0, 0, 0, 0.4);
}
.bank.is-increasing .number {
  transform: scale(1.1);
}
.chip {
  height: 100%;
  aspect-ratio: 1;
}
.times {
  text-align: center;
  font-size: 2rem;
  flex: 1;
}
.number {
  min-width: 2ch;
  text-align: center;
  transition: all 0.2s ease;
  line-height: normal;
}
.is-spinning {
  animation: spin 1s ease;
  transform-origin: center;
  transform-box: fill-box;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
@keyframes spin {
  0% {
    transform: rotate3d(0, 1, 0, 0deg);
  }
  100% {
    transform: rotate3d(0, 1, 0, 2160deg);
  }
}
</style>
