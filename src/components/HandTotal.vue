<script setup lang="ts">
import { type Hand } from '@/types'
import { dealer, state } from '@/store'
import { computed } from 'vue'

const props = defineProps<{ hand: Hand }>()

const total = computed(() => {
  if (props.hand.cards.length < 2) return // Wait until two cards are dealt
  const isDealer = dealer.value.hands.includes(props.hand)
  if (isDealer && !state.showDealerHoleCard) return // Hide dealer's total until hole card is revealed
  return props.hand.total
})
</script>

<template>
  <transition name="pop">
    <p v-if="total" class="hand-total" :class="{ bust: total > 21, 'twenty-one': total === 21 }">
      <span class="sr-only">Total:</span>
      {{ total }}
    </p>
  </transition>
</template>

<style scoped>
.hand-total {
  --background-color: var(--color-cyan);
  display: inline-block;
  position: absolute;
  top: -1.4rem;
  right: -1.4rem;
  width: 2.8rem;
  height: 2.8rem;
  font-size: 1.4rem;
  margin: 0;
  font-variation-settings: 'wght' 700;
  line-height: 2em;
  background: var(--background-color);
  border-radius: 50%;
  text-align: center;
  letter-spacing: 0.05em;
  color: var(--color-black);
  transform-origin: center center;
  z-index: 3;
}
.bust {
  --background-color: var(--color-red);
  color: var(--color-white);
}
.twenty-one {
  --background-color: var(--color-gold);
}
.bust,
.twenty-one {
  filter: drop-shadow(0 0 0.5rem var(--background-color));
}
.pop-enter-active {
  transition: all 0.3s ease-out;
}
.pop-leave-active {
  transition: all 0.1s ease-in;
}
.pop-enter-from,
.pop-leave-to {
  scale: 0;
  rotate: 360deg;
}
</style>
