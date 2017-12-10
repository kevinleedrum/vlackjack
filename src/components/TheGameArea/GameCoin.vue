<template>
  <svg class="game-coin" :class="{ 'is-spinning': isSpinning }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 52">
    <circle cx="24" cy="28" r="24" class="fill-gold" />
    <circle cx="24" cy="28" r="24" class="fill-red" opacity="0.75"/>
    <circle cx="24" cy="24" r="24" class="fill-gold" />
    <circle cx="24" cy="24" r="20.31" class="fill-red" opacity="0.4"/>
    <polygon points="24 5.32 28.14 18.06 41.54 18.06 30.7 25.94 34.84 38.68 24 30.8 13.16 38.68 17.3 25.94 6.46 18.06 19.86 18.06 24 5.32" class="fill-gold" />
  </svg>
</template>

<script>
export default {
  props: {
    isSpinning: {
      type: Boolean,
      required: false
    }
  }
};
</script>

<style scoped>
.game-coin {
  width: 3rem;
  height: 3rem;
}
.game-coin.is-spinning {
  animation: coin-spin 1s ease;
  transform-origin: center;
  transform-box: fill-box;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
@keyframes coin-spin {
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(6 * 360deg);
  }
}
</style>
