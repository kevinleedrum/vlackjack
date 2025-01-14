<script lang="ts" setup>
import { ref, type CSSProperties } from 'vue'

const NUM_SHAPES = 60
const MIN_SIZE = 20
const MAX_SIZE = 80
const MIN_DURATION = 60
const MAX_DURATION = 120

type Shape = {
  id: number
  suit: string
  style: CSSProperties
}

const shapes = ref<Shape[]>([])
shapes.value = Array.from({ length: NUM_SHAPES }, (_, i) => ({
  id: i,
  suit: ['♣', '♦', '♥', '♠'][i % 4],
  style: {
    top: `${Math.random() * window.innerHeight}px`,
    width: `${Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE}px`,
    height: `${Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE}px`,
    animationDuration: `${Math.random() * (MAX_DURATION - MIN_DURATION) + MIN_DURATION}s`,
    animationDelay: `${-Math.random() * MAX_DURATION}s`,
  },
}))
</script>

<template>
  <div v-once class="animated-bg">
    <svg v-for="shape in shapes" :key="shape.id" :style="shape.style">
      <use :href="`#suit-${shape.suit}`" />
    </svg>
  </div>
</template>

<style scoped>
.animated-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: -1;
}
.animated-bg svg {
  opacity: 0.2;
  position: absolute;
  left: -80px;
  animation: fall 5s linear infinite;
  color: transparent;
  stroke-width: 2;
  stroke: var(--color-cyan);
  filter: blur(0.5px);
}
@keyframes fall {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(calc(100vw + 80px), 0, 0);
  }
}
</style>
