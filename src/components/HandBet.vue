<template>
  <transition-group
    tag="div"
    name="chip"
    class="hand-bet"
    :class="{ 'is-win': isWin, 'is-loss': isLoss }"
  >
    <svg class="chip" v-for="i in hand.bet" :key="i">
      <use href="#chip" />
    </svg>
  </transition-group>
</template>

<script lang="ts" setup>
import type { Hand } from '@/types'
import { computed } from 'vue'
const props = defineProps<{ hand: Hand }>()
const isLoss = computed(() => ['lose', 'bust'].includes(props.hand.result!))
const isWin = computed(() => ['push', 'win', 'blackjack'].includes(props.hand.result!))
</script>

<style scoped>
.hand-bet {
  position: absolute;
  bottom: -4rem;
  left: 0;
  width: 100%;
  text-align: center;
}
.chip {
  height: 2rem;
  aspect-ratio: 1;
  color: var(--color-chip);
  transition: all 0.3s ease-in;
}
.chip.is-enter-active,
.chip.is-leave-active {
  will-change: transform, opacity;
}
.chip-leave-to,
.is-win .chip-enter-from {
  transform: translate3d(0, -50vh, 0);
  opacity: 0;
}
.chip-enter-from,
.is-win .chip-leave-to {
  transform: translate3d(0, 50vh, 0);
  opacity: 0;
}
</style>
