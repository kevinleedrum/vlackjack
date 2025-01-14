<script setup lang="ts">
import { type Hand } from '@/blackjack'
import PlayingCard from './PlayingCard.vue'
import { dealer, state } from '@/store'
import type { Card, Player } from '@/types'
import HandTotal from './HandTotal.vue'
import HandBet from './HandBet.vue'
import { computed } from 'vue'

const props = defineProps<{
  hand: Hand
  player: Player
}>()

const isActiveHand = computed(() => state.activeHand === props.hand && !props.player.isDealer)

const isSplitHand = computed(
  () => state.activePlayer === props.player && !!state.activeHand && props.player.hands.length > 1,
)

const isDealer = computed(() => dealer.value.hands.includes(props.hand))

function isFaceDown(card: Card) {
  if (!isDealer.value) return false
  if (props.hand.cards.indexOf(card) !== 0) return false
  return !state.showDealerHoleCard
}

function isSplitCard(card: Card) {
  if (props.player.hands.indexOf(props.hand) !== 1) return false
  return props.hand.cards.indexOf(card) === 0
}
</script>

<template>
  <article class="hand" :class="{ 'active-hand': isActiveHand, 'split-hand': isSplitHand }">
    <h2 class="sr-only">{{ isDealer ? "Dealer's" : 'Your' }} hand</h2>
    <transition-group name="deal">
      <PlayingCard
        v-for="card in hand.cards"
        :card="card"
        :is-face-down="isFaceDown(card)"
        :key="card.index"
        :class="{ 'split-card': isSplitCard(card) }"
      />
    </transition-group>
    <HandBet :hand="hand" />
    <div v-if="!player.isDealer" class="hand-result">
      <transition name="result">
        <svg v-if="hand.result" :class="{ blackjack: hand.result === 'blackjack' }">
          <use :href="`#result-${hand.result}`" />
        </svg>
      </transition>
    </div>
    <HandTotal :hand="hand" />
  </article>
</template>

<style scoped>
.hand {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  position: relative;
  transition: scale 0.3s ease-in-out;
  isolation: isolate;
  width: fit-content;
  min-height: 11.2rem;
  min-width: 8rem;
  max-width: 60vw;
}
.active-hand {
  scale: 1.3;
  transform-origin: center center;
  z-index: 1;
}
@media (prefers-reduced-motion: reduce) {
  .active-hand {
    scale: 1;
  }
}
.split-hand:not(.active-hand) {
  opacity: 0.5;
}
.hand-result {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.hand-result svg {
  position: absolute;
  margin-top: 2rem;
  width: 14rem;
}
.hand-result svg.blackjack {
  transform: scale(1.5);
}
.split-card {
  animation: split 0.3s ease-in-out forwards;
}
.deal-enter-active {
  z-index: 2;
  animation: deal 0.3s;
}
.deal-leave-active:not(.active-hand .card) {
  z-index: 2;
  animation: deal 0.3s reverse;
}
.result-enter-active {
  animation: unmask 0.4s ease-in-out forwards;
}
.result-leave-active {
  animation: unmask 0.1s ease-in-out reverse;
  z-index: 2;
}
@keyframes deal {
  0% {
    transform: translate3d(0, -100vh, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes split {
  0% {
    transform: translate3d(-7rem, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes unmask {
  0% {
    clip-path: inset(0 0 100% 100%);
  }
  100% {
    clip-path: inset(0 0 0 0);
  }
}
</style>
