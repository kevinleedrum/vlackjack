<script setup lang="ts">
import { type Card } from '@/types'
import { computed } from 'vue'

const FACE_NAMES = {
  A: 'Ace',
  J: 'Jack',
  Q: 'Queen',
  K: 'King',
}

const SUIT_NAMES = {
  '♠': 'Spades',
  '♦': 'Diamonds',
  '♣': 'Clubs',
  '♥': 'Hearts',
}

const props = defineProps<{
  card: Card
  isFaceDown?: boolean
}>()

const symbolCount = computed(() => {
  if (['J', 'Q', 'K', 'A', 'a'].includes(props.card.rank)) return 1
  return +props.card.rank
})

function getCardLabel(card: Card) {
  if (props.isFaceDown) return 'Face-down card'
  const rank = Object.keys(FACE_NAMES).includes(card.rank)
    ? FACE_NAMES[card.rank as keyof typeof FACE_NAMES]
    : card.rank
  const suit = SUIT_NAMES[card.suit as keyof typeof SUIT_NAMES]
  return `${rank} of ${suit}`
}
</script>

<template>
  <div
    class="card"
    :data-rank="isFaceDown ? null : card.rank.toLowerCase()"
    :data-suit="isFaceDown ? null : card.suit"
    role="img"
    :aria-label="getCardLabel(card)"
    :class="{ 'face-down': isFaceDown }"
  >
    <div class="card-face" role="presentation">
      <template v-if="!isFaceDown">
        <div class="card-corner" v-if="!isFaceDown">
          <span class="card-rank">{{ card.rank.toUpperCase() }}</span>
          <svg>
            <use :href="'#suit-' + card.suit"></use>
          </svg>
        </div>
        <div class="card-center">
          <svg v-for="i in symbolCount" :key="i">
            <use :href="'#suit-' + card.suit"></use>
          </svg>
        </div>
        <div class="card-corner" v-if="!isFaceDown">
          <span class="card-rank">{{ card.rank.toUpperCase() }}</span>
          <svg class="card-suit">
            <use :href="'#suit-' + card.suit"></use>
          </svg>
        </div>
      </template>
    </div>
    <div class="card-back" role="presentation">
      <svg>
        <use href="#flourish"></use>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  display: inline-block;
  width: 8rem;
  height: 11.2rem;
  transition: all 0.2s ease;
  line-height: 1;
}
.card[data-suit='♥'],
.card[data-suit='♦'] {
  color: var(--color-red);
}
.card-face,
.card-back {
  border-radius: 0.75rem;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  backface-visibility: hidden;
  transition: transform 0.5s;
  transform-style: preserve-3d;
}
.card-face {
  background-image: linear-gradient(to bottom, var(--color-white), var(--color-blue-white));
  background-color: var(--color-white);
  padding: 0.4rem;
  display: flex;
  gap: 0.25rem;
}
.card-corner {
  font-size: 2.2rem;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
.card-corner:last-of-type {
  flex-direction: column-reverse;
  justify-content: end;
}
.card-corner:last-of-type > * {
  transform-origin: center;
  rotate: 180deg;
}
.card-center {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(8, 1fr);
  align-items: center;
  padding: 0.5rem 0.05rem;
}
.card-corner svg {
  height: 0.5em;
  aspect-ratio: 1;
}
.card-center svg {
  grid-row-end: span 2;
  object-fit: cover;
  aspect-ratio: 1;
  width: 100%;
  overflow: visible;
}
.card-back {
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotateY(-180deg);
  background-color: var(--color-red);
  padding: 0.65rem;
  overflow: hidden;
  outline: 0.1rem solid rgba(255, 255, 255, 0.75);
  outline-offset: -0.65rem;
  border: 0.4rem solid var(--color-white);
}
.card-back svg {
  --color-black: var(--color-white);
  width: 100%;
  opacity: 0.75;
}
.face-down .card-back {
  transform: rotateY(0deg);
}
.face-down .card-face {
  transform: rotateY(180deg);
}
[data-rank='a'] svg,
[data-rank='j'] svg,
[data-rank='q'] svg,
[data-rank='k'] svg {
  grid-row-start: 2;
  grid-column-start: 1;
  grid-row-end: span 6;
  grid-column-end: span 3;
}

[data-rank='2'] svg:first-child {
  grid-row-start: 1;
  grid-column-start: 2;
}

[data-rank='2'] svg:nth-child(2) {
  grid-row-start: 7;
  grid-column-start: 2;
  transform: rotate(180deg);
}

[data-rank='3'] svg:first-child {
  grid-row-start: 1;
  grid-column-start: 2;
}

[data-rank='3'] svg:nth-child(2) {
  grid-row-start: 4;
  grid-column-start: 2;
}

[data-rank='3'] svg:nth-child(3) {
  grid-row-start: 7;
  grid-column-start: 2;
  transform: rotate(180deg);
}

[data-rank='4'] svg:first-child {
  grid-row-start: 1;
  grid-column-start: 1;
}

[data-rank='4'] svg:nth-child(2) {
  grid-row-start: 1;
  grid-column-start: 3;
}

[data-rank='4'] svg:nth-child(3) {
  grid-row-start: 7;
  grid-column-start: 1;
  transform: rotate(180deg);
}

[data-rank='4'] svg:nth-child(4) {
  grid-row-start: 7;
  grid-column-start: 3;
  transform: rotate(180deg);
}

[data-rank='5'] svg:first-child {
  grid-row-start: 1;
  grid-column-start: 1;
}

[data-rank='5'] svg:nth-child(2) {
  grid-row-start: 1;
  grid-column-start: 3;
}

[data-rank='5'] svg:nth-child(3) {
  grid-row-start: 7;
  grid-column-start: 1;
  transform: rotate(180deg);
}

[data-rank='5'] svg:nth-child(4) {
  grid-row-start: 7;
  grid-column-start: 3;
  transform: rotate(180deg);
}

[data-rank='5'] svg:nth-child(5) {
  grid-row-start: 4;
  grid-column-start: 2;
}

[data-rank='6'] svg:first-child {
  grid-row-start: 1;
  grid-column-start: 1;
}

[data-rank='6'] svg:nth-child(2) {
  grid-row-start: 1;
  grid-column-start: 3;
}

[data-rank='6'] svg:nth-child(3) {
  grid-row-start: 7;
  grid-column-start: 1;
  transform: rotate(180deg);
}

[data-rank='6'] svg:nth-child(4) {
  grid-row-start: 7;
  grid-column-start: 3;
  transform: rotate(180deg);
}

[data-rank='6'] svg:nth-child(5) {
  grid-row-start: 4;
  grid-column-start: 1;
}

[data-rank='6'] svg:nth-child(6) {
  grid-row-start: 4;
  grid-column-start: 3;
}

[data-rank='7'] svg:first-child {
  grid-row-start: 1;
  grid-column-start: 1;
}

[data-rank='7'] svg:nth-child(2) {
  grid-row-start: 1;
  grid-column-start: 3;
}

[data-rank='7'] svg:nth-child(3) {
  grid-row-start: 7;
  grid-column-start: 1;
  transform: rotate(180deg);
}

[data-rank='7'] svg:nth-child(4) {
  grid-row-start: 7;
  grid-column-start: 3;
  transform: rotate(180deg);
}

[data-rank='7'] svg:nth-child(5) {
  grid-row-start: 4;
  grid-column-start: 1;
}

[data-rank='7'] svg:nth-child(6) {
  grid-row-start: 4;
  grid-column-start: 3;
}

[data-rank='7'] svg:nth-child(7) {
  grid-row-start: 2;
  grid-column-start: 2;
}

[data-rank='8'] svg:first-child {
  grid-row-start: 1;
  grid-column-start: 1;
}

[data-rank='8'] svg:nth-child(2) {
  grid-row-start: 1;
  grid-column-start: 3;
}

[data-rank='8'] svg:nth-child(3) {
  grid-row-start: 7;
  grid-column-start: 1;
  transform: rotate(180deg);
}

[data-rank='8'] svg:nth-child(4) {
  grid-row-start: 7;
  grid-column-start: 3;
  transform: rotate(180deg);
}

[data-rank='8'] svg:nth-child(5) {
  grid-row-start: 4;
  grid-column-start: 1;
}

[data-rank='8'] svg:nth-child(6) {
  grid-row-start: 4;
  grid-column-start: 3;
}

[data-rank='8'] svg:nth-child(7) {
  grid-row-start: 2;
  grid-column-start: 2;
}

[data-rank='8'] svg:nth-child(8) {
  grid-row-start: 6;
  grid-column-start: 2;
  transform: rotate(180deg);
}

[data-rank='9'] svg:first-child {
  grid-row-start: 1;
  grid-column-start: 1;
}

[data-rank='9'] svg:nth-child(2) {
  grid-row-start: 3;
  grid-column-start: 1;
}

[data-rank='9'] svg:nth-child(3) {
  grid-row-start: 5;
  grid-column-start: 1;
  transform: rotate(180deg);
}

[data-rank='9'] svg:nth-child(4) {
  grid-row-start: 7;
  grid-column-start: 1;
  transform: rotate(180deg);
}

[data-rank='9'] svg:nth-child(5) {
  grid-row-start: 1;
  grid-column-start: 3;
}

[data-rank='9'] svg:nth-child(6) {
  grid-row-start: 3;
  grid-column-start: 3;
}

[data-rank='9'] svg:nth-child(7) {
  grid-row-start: 5;
  grid-column-start: 3;
  transform: rotate(180deg);
}

[data-rank='9'] svg:nth-child(8) {
  grid-row-start: 7;
  grid-column-start: 3;
  transform: rotate(180deg);
}

[data-rank='9'] svg:nth-child(9) {
  grid-row-start: 4;
  grid-column-start: 2;
}

[data-rank='10'] svg:first-child {
  grid-row-start: 1;
  grid-column-start: 1;
}

[data-rank='10'] svg:nth-child(2) {
  grid-row-start: 3;
  grid-column-start: 1;
}

[data-rank='10'] svg:nth-child(3) {
  grid-row-start: 5;
  grid-column-start: 1;
  transform: rotate(180deg);
}

[data-rank='10'] svg:nth-child(4) {
  grid-row-start: 7;
  grid-column-start: 1;
  transform: rotate(180deg);
}

[data-rank='10'] svg:nth-child(5) {
  grid-row-start: 1;
  grid-column-start: 3;
}

[data-rank='10'] svg:nth-child(6) {
  grid-row-start: 3;
  grid-column-start: 3;
}

[data-rank='10'] svg:nth-child(7) {
  grid-row-start: 5;
  grid-column-start: 3;
  transform: rotate(180deg);
}

[data-rank='10'] svg:nth-child(8) {
  grid-row-start: 7;
  grid-column-start: 3;
  transform: rotate(180deg);
}

[data-rank='10'] svg:nth-child(9) {
  grid-row-start: 2;
  grid-column-start: 2;
}

[data-rank='10'] svg:nth-child(10) {
  grid-row-start: 6;
  grid-column-start: 2;
  transform: rotate(180deg);
}
</style>
